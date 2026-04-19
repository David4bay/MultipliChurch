import { Navigate } from "react-router-dom"
import AdminView from "./features/AdminView"
import MemberView from "./features/MemberView"
import DashboardNav from "./features/DashboardNav"
import "../User.css"
import React, { useState } from "react"

function decodeToken(token) {
    try { return JSON.parse(atob(token.split(".")[1])) } catch { return null }
}

function Dashboard() {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("jwtSession") ? JSON.parse(localStorage.getItem("jwtSession"))?.token : null
    })

    if (!token) return <Navigate to="/" replace />

    const decoded = decodeToken(token)
    const isAdmin = decoded?.role === "admin"

    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <DashboardNav token={token} setToken={setToken} />
            {isAdmin
                ? <AdminView token={token} />
                : <MemberView token={token} />
            }
        </React.Suspense>
    )
}

export default Dashboard