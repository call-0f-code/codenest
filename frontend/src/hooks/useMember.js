import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, getDetails } from "../utils/api/memberApi";


export function useMembers(){
    const queryclient = useQueryClient();

  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async (memberId) => {
      const data = await getDetails(memberId);
      return data;
    }
});

  const login = useMutation({
    mutationFn: async(memberData) => {
      const data = await signIn(member.email, member.password);
      return data.token;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['members'] });
      if (token) {
        localStorage.setItem('token', token);
      }
    },
  });

  const createNewMember = useMutation({
    mutationFn: async(memberData) => 
        await signUp(memberData.email, memberData.password, memberData.name, memberData.passoutYear),
    onSuccess: () => {
        queryclient.invalidateQueries({queryKey: ['members']});
    }
    
  })

  return {
    members,
    error,
    isLoading,
    createNewMember,
    login,
  };
}