import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchChurches, fetchChurchById, postChurch, putChurch, destroyChurch } from "../api/api"

export function useChurches() {
    return useQuery({
        queryKey: ["churches"],
        queryFn: fetchChurches
    })
}

export function useChurch(id) {
    return useQuery({
        queryKey: ["churches", id],
        queryFn: () => fetchChurchById(id),
        enabled: !!id
    })
}

export function useCreateChurch() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postChurch,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["churches"] })
    })
}

export function useUpdateChurch() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: putChurch,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["churches"] })
            queryClient.invalidateQueries({ queryKey: ["churches", variables.id] })
        }
    })
}

export function useDeleteChurch() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: destroyChurch,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["churches"] })
    })
}