import { createInterviewExp, deleteInterviewExp, getAllInterviewExps, getInterviewExpById, updateInterviewExp } from "@/utils/api/interviewApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useInterview (interviewId) {
    const queryClient = useQueryClient();
    
    //all interview exps, most are probably rejections lmao
    const [page, setPage] = useState(1);
    const [verdict, setVerdict] = useState("All");
    const limit = 10; 

    const { data: interviewsResponse, isLoading, error } = useQuery({
        queryKey: ["interviews", page, verdict], 
        queryFn: () => getAllInterviewExps(page, limit, verdict),
        keepPreviousData: true,
    });

    const interviews = interviewsResponse?.data || [];
    const totalPages = interviewsResponse?.totalPages || 1;

    //interview by id
    const {data: interview, isInterviewExpLoading, interviewExpError} = useQuery({
        queryKey: ['interviews', interviewId], 
        queryFn: () => getInterviewExpById(interviewId), 
        enabled: !!interviewId
    })

    //create an interview exp, for people who want to self-report their Ls
    const postInterviewExp =   useMutation({
        mutationFn: (interviewData) => createInterviewExp(interviewData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['interviews']})
    })

    return {
        interview, 
        interviews,
        isLoading,
        error, 
        isInterviewExpLoading, 
        interviewExpError,
        postInterviewExp,
        page,
        setPage,
        totalPages,
        limit,
        verdict,
        setVerdict
    }

} 