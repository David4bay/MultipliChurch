/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate } from "react-router-dom"
import { useChurches } from "../../hooks/useChurches"
import { useAddMember, useMembers } from "../../hooks/useMembers"
import { useState } from "react"

function decodeToken(token) {
    try { 
        return JSON.parse(atob(token.split(".")[1])) 
    } catch { 
        return null 
    }
}

function MemberView({ token }) {
    
    if (!token) return <Navigate to="/" replace />
    
    const decoded = decodeToken(token)

    // Admins have their own view
    if (decoded?.role === "admin") return null
    
    const { data: churches, isLoading, refetch } = useChurches()
    const [selectedChurchId, setSelectedChurchId] = useState(null)
    const { data: members } = useMembers(selectedChurchId)
    const addMember = useAddMember()

    console.log("churches", churches, "members", members)
    
    function handleAddMember(churchId) {
        if (!churchId) return 
        console.log("add member run")
        addMember.mutate({ churchId, user_id: decoded.id}, {
            onSuccess: () => {
                console.log("member user added.")
                refetch()
            },
            onError: () => console.log("failed to add member user.")
        })
        setSelectedChurchId(churchId)
    }

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
                                    style={{ cursor: "pointer", fontWeight: selectedChurchId === church.id ? "bold" : "normal" }}
                                    className="church__list"
                                    >
                                    <span 
                                    className="church__list-item"
                                    >{church.name} — {church.total_members} members 
                                    <button
                                    type="button"
                                    onClick={() => handleAddMember(church.id)}
                                    >join</button>
                                    </span>
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
                {
                    selectedChurchId ? (
                        <article className="dashboard__article">
                            <h2>Members {selectedChurchId ? `of Church #${selectedChurchId}` : ""}</h2>
                            <ul>
                                {members?.map((member) => (
                                    <li key={member.id}>{member.username}</li>
                                ))}
                            </ul>
                        </article>
                    ) : null
                }
                
            </div>
        </section>
    )
}

export default MemberView