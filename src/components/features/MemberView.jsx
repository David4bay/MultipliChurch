/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate } from "react-router-dom"
import { useChurches } from "../../hooks/useChurches"
import { useMembers } from "../../hooks/useMembers"
import { useState } from "react"

function decodeToken(token) {
    try { return JSON.parse(atob(token.split(".")[1])) } catch { return null }
}

function MemberView({ token }) {
    const [selectedChurchId, setSelectedChurchId] = useState(null)

    if (!token) return <Navigate to="/" replace />

    const decoded = decodeToken(token)

    // Admins have their own view
    if (decoded?.role === "admin") return null

    const { data: churches, isLoading } = useChurches()
    const { data: members } = useMembers(selectedChurchId)

    return (
        <section className="dashboard">
            <h1 className="user__title">{decoded?.username}'s Dashboard</h1>
            <div className="dashboard__content">
                <article className="dashboard__article">
                    <h2>All Churches</h2>
                    {isLoading ? <p>Loading...</p> : (
                        <ul>
                            {churches?.map((church) => (
                                <li
                                    key={church.id}
                                    onClick={() => setSelectedChurchId(church.id)}
                                    style={{ cursor: "pointer", fontWeight: selectedChurchId === church.id ? "bold" : "normal" }}
                                >
                                    {church.name} — {church.total_members} members
                                </li>
                            ))}
                            {
                            churches.length < 1 ? (
                                <p>No churches are available at the moment.</p>
                            ) : null
                            }
                        </ul>
                    )}
                </article>
                <article className="dashboard__article">
                    <h2>Members {selectedChurchId ? `of Church #${selectedChurchId}` : ""}</h2>
                    <ul>
                        {members?.map((member) => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    )
}

export default MemberView