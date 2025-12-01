import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompletedQuestions, toggleQuestion } from "@/utils/api/questionApi";
import { getQuestionsById } from "@/utils/api/topicApi";
import { useAuth } from "@/context/AuthContext";
import { handleApiError } from "@/utils/handleApiError";

export const useQuestions = (topicId) => {
    const queryclient = useQueryClient();
    const {accessToken} = useAuth()

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
        // Only fetch completed questions if the user is authenticated
        enabled: !!accessToken, 
    });

    const toggle = useMutation({
        mutationFn: (questionId) => toggleQuestion(questionId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
            queryclient.invalidateQueries({ queryKey: ['completedQuestions'] })
        },
         onError: (err) => handleApiError(err),

    })

    return {
        questions,
        completed,
        error,
        isLoading,
        toggle,
    };
}