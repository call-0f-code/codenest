import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, getDetails, forgotPassword, verifyOtp, resetPassword, updateMember, getMemberInterviews } from "../utils/api/memberApi";
import { globalToast } from "@/utils/toast";


export function useMembers(){
  const queryclient = useQueryClient();
  
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getDetails();
      return data.users;
    },
    enabled:!!localStorage.getItem('token')
});

  const login = useMutation({
    mutationFn: async(memberData) => {
      const data = await signIn(memberData.email, memberData.password);
      return data.token;
    },
    onSuccess: (token) => {
      queryclient.invalidateQueries({ queryKey: ['members'] });
      if (token) {
        localStorage.setItem('token', token);
      }
    },
  });

  const createNewMember = useMutation({
    mutationFn: async(memberData) => 
        await signUp(memberData.email, memberData.password, memberData.name, memberData.passoutYear),
    
  })

  const forgotpassword = useMutation({
    mutationFn : async(email) =>{
      await forgotPassword(email)
    },
    onSuccess : ()=>{
      globalToast.success("OTP Sent Successfully")
    }
  })

  const verifyotp = useMutation({
    mutationFn : async({email,otp}) =>{
      const data = await verifyOtp(email,otp)
      return data.token
    },
    onSuccess : (token)=>{
      globalToast.success("OTP verified")
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  })

  const resetpassword = useMutation({
     mutationFn : async(memberData) =>{
      await resetPassword(memberData)
    },
    onSuccess : ()=>{
      localStorage.removeItem('token')
      globalToast.success("Password reset successfully");
    }
  })

  const update = useMutation({
    mutationFn:updateMember,
    onSuccess:()=>{
      queryclient.invalidateQueries({ queryKey: ['members'] });
      globalToast.success("Profile Updated")
    }
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
    update
  };
}

// New hook for fetching member interviews
export function useMemberInterviews(memberId) {
  const { data: memberInterviews = [], isLoading: isLoadingInterviews } = useQuery({
    queryKey: ['memberInterviews', memberId],
    queryFn: () => getMemberInterviews(memberId),
    enabled: !!memberId,
    select: (data) => data.interviews // Assuming api returns { success: true, data: [...] }
  });

  return { memberInterviews, isLoadingInterviews };
}