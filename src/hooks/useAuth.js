import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { loginUser, signupUser } from "../api/api"

let decoded

function decodeToken(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]))
    } catch {
        return null
    }
}

export function useLogin() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem("jwtSession", JSON.stringify(data))
            decoded = decodeToken(data.token)
            navigate(decoded?.role === "admin" ? "/admin" : "/user", { replace: true })
        },
        onError: (err) => {
            console.error("Login error:", err.message)
        }
    })
}

export function useSignup() {
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            localStorage.setItem("jwtSession", JSON.stringify(data))
            decoded = decodeToken(data.token)
            navigate(decoded?.role === "admin" ? "/admin" : "/user", { replace: true })
        },
        onError: (err) => {
            console.error("Signup error:", err.message)
        }
    })
}