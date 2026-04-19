import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchMembers, fetchMemberById, postMember, putMember, destroyMember } from "../api/api"

export function useMembers(churchId) {
    return useQuery({
        queryKey: ["members", churchId],
        queryFn: () => fetchMembers(churchId),
        enabled: !!churchId
    })
}

export function useMember({ churchId, id }) {
    return useQuery({
        queryKey: ["members", churchId, id],
        queryFn: () => fetchMemberById({ churchId, id }),
        enabled: !!churchId && !!id
    })
}

export function useAddMember() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postMember,
        onSuccess: (_, variables) =>
            queryClient.invalidateQueries({ queryKey: ["members", variables.churchId] })
    })
}

export function useUpdateMember() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: putMember,
        onSuccess: (_, variables) =>
            queryClient.invalidateQueries({ queryKey: ["members", variables.churchId] })
    })
}

export function useRemoveMember() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: destroyMember,
        onSuccess: (_, variables) =>
            queryClient.invalidateQueries({ queryKey: ["members", variables.churchId] })
    })
}