import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, getDetails, forgotPassword, verifyOtp, resetPassword, updateMember, getMemberInterviews, signout } from "../utils/api/memberApi";
import { globalToast } from "@/utils/toast";
import { deleteInterviewExp, updateInterviewExp } from "@/utils/api/interviewApi";
import { handleApiError } from "@/utils/handleApiError";
import { useAuth } from "@/context/AuthContext";

export function useMembers(){
  const queryclient = useQueryClient();
    const {setAccessToken} = useAuth()

  
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getDetails();
      return data.users;
    },
});

  const login = useMutation({
    mutationFn: async(memberData) => {
      const data = await signIn(memberData.email, memberData.password);
      return data.token;
    },
    onSuccess: (token) => {
      globalToast.success("Login Successfull");
      queryclient.invalidateQueries({ queryKey: ['members'] });
      if (token) {
        setAccessToken(token);
      }
      window.location.replace("/profile");
    },
    onError: (err) => handleApiError(err),

  });

  const createNewMember = useMutation({
    mutationFn: async(memberData) => await signUp(memberData.email, memberData.password, memberData.name, memberData.passoutYear),
    onError: (err) => handleApiError(err),
  })

  const forgotpassword = useMutation({
    mutationFn : async(email) =>{
      await forgotPassword(email)
    },
    onSuccess : ()=>{
      globalToast.success("OTP Sent Successfully")
    },
    
  })

  const verifyotp = useMutation({
    mutationFn : async({email,otp}) =>{
      const data = await verifyOtp(email,otp)
      return data.token
    },
    onSuccess : (token)=>{
      globalToast.success("OTP verified")
      if (token) {
        setAccessToken(token);
      }
    },
    onError: (err) => handleApiError(err),

  })

  const resetpassword = useMutation({
     mutationFn : async(memberData) =>{
      await resetPassword(memberData)
    },
    onSuccess : ()=>{
      setAccessToken(null)
      globalToast.success("Password reset successfully");
    },
         onError: (err) => handleApiError(err),

  })

  const update = useMutation({
    mutationFn:updateMember,
    onSuccess:()=>{
      queryclient.invalidateQueries({ queryKey: ['members'] });
      globalToast.success("Profile Updated")
    },
         onError: (err) => handleApiError(err),

  })

    const logout = useMutation({
        mutationFn: signout,
        onSuccess:()=>{
            setAccessToken(null);
            queryclient.setQueryData(["members"],null)
            window.location.replace("/signup");
        },
         onError: (err) => handleApiError(err),
    })

  return {
    members,
    error,
    isLoading,
    createNewMember,
    login,
    forgotpassword,
    verifyotp,
    resetpassword,
    update,
    logout
  };
}

// New hook for fetching member interviews
export function useMemberInterviews(memberId) {
  const queryClient = useQueryClient();

  const { data: memberInterviews = [], isLoading: isLoadingInterviews } = useQuery({
    queryKey: ['memberInterviews', memberId],
    queryFn: () => getMemberInterviews(memberId),
    enabled: !!memberId,
    select: (data) => data.interviews
  });
  const deleteMemberInterview = useMutation({
    mutationFn: deleteInterviewExp,
    onSuccess: () => {
      queryClient.invalidateQueries(["memberInterviews"], memberId);
      globalToast.success("Interview deleted successfully");
    },
    onError: () => globalToast.error("Failed to delete interview"),
  });
  
  const updateMemberInterview = useMutation({
    mutationFn: ({ id, data }) => updateInterviewExp(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["memberInterviews"]);
      globalToast.success("Interview updated successfully");
    },
    onError: () => globalToast.error("Failed to update interview"),
  });
  
  return { memberInterviews, isLoadingInterviews, updateMemberInterview, deleteMemberInterview };
}
