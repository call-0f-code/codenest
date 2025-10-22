import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTopics, getQuestionsById } from "../utils/api/topicApi";

export const useTopics = () => {
    const queryclient = useQueryClient();

    const {data:topics = [],isLoading, error} = useQuery({
        queryKey:['topics'],
        queryFn: async () => {
            const response = await getTopics();
            return response.topics;
        }
    })


    return {
        topics,
        error,
        isLoading,
  };
}
