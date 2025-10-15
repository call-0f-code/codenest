import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp, getDetails } from "../utils/api/memberApi";


export function useMembers(){
    const queryclient = useQueryClient();

  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members']   ,
    queryFn: async (memberId) => {
      const data = await getDetails(memberId);
      return data.members;
    }
});

  const login = useMutation({
    mutationFn: async(memberData) =>
      await signUp(memberData.email, memberData.password),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const createNewMember = useMutation({
    mutationFn: async(memberData) => 
        await signIn(memberData.email, memberData.password, memberData.name),
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