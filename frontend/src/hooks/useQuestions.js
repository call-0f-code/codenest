import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompletedQuestions, toggleQuestion } from "@/utils/api/questionApi";
import { getQuestionsById } from "@/utils/api/topicApi";

export const useQuestions = (topicId) => {
    const queryclient = useQueryClient();
    const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['questions', topicId],
    queryFn: async () => {
      const res = await getQuestionsById(topicId);
      return res.questions || [];
    },
    enabled: !!topicId,
  });

    const { data: completed = [] } = useQuery({
    queryKey: ['completedQuestions'],
    queryFn: async () => {
      const res = await getCompletedQuestions();
      return res.completedQuestion || [];
    },
  });

    const toggle = useMutation({
        mutationFn: (questionId)=> toggleQuestion(questionId),
        onSuccess: ()=>{
          queryclient.invalidateQueries({queryKey:['questions']});
          queryclient.invalidateQueries({queryKey:['completedQuestions']})
        }
    })

    return {
    questions,
    completed,
    error,
    isLoading,
    toggle,
  };
}
