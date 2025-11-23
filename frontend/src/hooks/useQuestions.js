import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompletedQuestions, toggleQuestion } from "@/utils/api/questionApi";
import { getQuestionsById } from "@/utils/api/topicApi";

export const useQuestions = (topicId) => {
    const queryclient = useQueryClient();
export const useQuestions = (topicId) => {
    const queryclient = useQueryClient();
    const [isAuthenticated, setIsAuthenticated] = React.useState(
        () => !!localStorage.getItem("token")
    );

    React.useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    
    // ... rest of the hook implementation

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
        enabled: isAuthenticated, 
    });

    const toggle = useMutation({
        mutationFn: (questionId) => toggleQuestion(questionId),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
            queryclient.invalidateQueries({ queryKey: ['completedQuestions'] })
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