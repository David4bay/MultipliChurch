import { Navigate } from "react-router-dom"
import AdminView from "./features/AdminView"
import MemberView from "./features/MemberView"
import DashboardNav from "./features/DashboardNav"
import "../User.css"

function decodeToken(token) {
    try { return JSON.parse(atob(token.split(".")[1])) } catch { return null }
}

function Dashboard() {
    const session = localStorage.getItem("jwtSession")
    const token = session ? JSON.parse(session)?.token : null

    if (!token) return <Navigate to="/" replace />

    const decoded = decodeToken(token)
    const isAdmin = decoded?.role === "admin"

    return (
        <div>
            <DashboardNav token={token} />
            {isAdmin
                ? <AdminView token={token} />
                : <MemberView token={token} />
            }
        </div>
    )
}

export default Dashboard