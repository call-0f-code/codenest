import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../utils/api/topicApi";

export const useTopics = () => {

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
