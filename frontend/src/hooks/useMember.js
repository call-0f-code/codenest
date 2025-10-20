import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, getDetails, forgotPassword, verifyOtp, resetPassword } from "../utils/api/memberApi";
import { globalToast } from "@/utils/toast";


export function useMembers(){
  const queryclient = useQueryClient();
  
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getDetails();
      return data;
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

  return {
    members,
    error,
    isLoading,
    createNewMember,
    login,
    forgotpassword,
    verifyotp,
    resetpassword
  };
}