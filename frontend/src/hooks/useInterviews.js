import { createInterviewExp, deleteInterviewExp, getAllInterviewExps, getInterviewExpById, updateInterviewExp } from "@/utils/api/interviewApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useInterview (interviewId) {
    const queryclient = useQueryClient();
    
    //all interview exps, most are probably rejections lmao
    const {data: interviews = [], isLoading, error} = useQuery({
        queryKey: ['interviews'], 
        queryFn: getAllInterviewExps
    })

    //interview by id
    const {data: interview, isInterviewExpLoading, interviewExpError} = useQuery({
        queryKey: ['interviews', interviewId], 
        queryFn: () => getInterviewExpById(interviewId), 
        enabled: !!interviewId
    })

    //create an interview exp, for people who want to self-report their Ls
    const postInterviewExp =   useMutation({
        mutationFn: (interviewData) => createInterviewExp(interviewData),
        onSuccess: () => queryclient.invalidateQueries({queryKey: ['interviews']})
    })

    //update interview exps, for those who are too dumb to get it right the first time
    const fixInterviewExp = useMutation({
        mutationFn: (interviewId, interviewData) => updateInterviewExp(interviewId, interviewData), 
        onSuccess: () => queryclient.invalidateQueries({queryKey: ['interviews']})
    })

    //delete interview exp, for those who lost the balls they had when they posted it
    const removeInterviewExp = useMutation({
        mutationFn: (interviewId) => deleteInterviewExp(interviewId),
        onSuccess: () => queryclient.invalidateQueries({queryKey: ['interviews']})
    })

    return {
        interview, 
        interviews,
        isLoading, 
        error, 
        isInterviewExpLoading, 
        interviewExpError,
        postInterviewExp,
        fixInterviewExp, 
        removeInterviewExp
    }

} 