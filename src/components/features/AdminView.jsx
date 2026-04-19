/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useChurches, useCreateChurch, useUpdateChurch, useDeleteChurch } from "../../hooks/useChurches"
import { useMembers, useAddMember, useRemoveMember } from "../../hooks/useMembers"

function decodeToken(token) {
    try { return JSON.parse(atob(token.split(".")[1])) } catch { return null }
}

function AdminView({ token }) {
    const [selectedChurchId, setSelectedChurchId] = useState(null)
    const [churchName, setChurchName] = useState("")
    const [memberName, setMemberName] = useState("")
    const [editingChurch, setEditingChurch] = useState(null) // { id, name }

    if (!token) return <Navigate to="/" replace />

    const { data: churches, isLoading, isError } = useChurches()
    const createChurch = useCreateChurch()
    const updateChurch = useUpdateChurch()
    const deleteChurch = useDeleteChurch()
    const { data: members } = useMembers(selectedChurchId)
    const addMember = useAddMember()
    const removeMember = useRemoveMember()

    function handleCreateChurch(e) {
        e.preventDefault()
        if (!churchName.trim()) return
        createChurch.mutate({ name: churchName }, {
            onSuccess: () => setChurchName("")
        })
    }

    function handleUpdateChurch(e) {
        e.preventDefault()
        if (!editingChurch?.name.trim()) return
        updateChurch.mutate(editingChurch, {
            onSuccess: () => setEditingChurch(null)
        })
    }

    function handleAddMember(e) {
        e.preventDefault()
        if (!memberName.trim() || !selectedChurchId) return
        addMember.mutate({ churchId: selectedChurchId, name: memberName }, {
            onSuccess: () => setMemberName("")
        })
    }

    if (isLoading) return <p>Loading churches...</p>
    if (isError) return <p>Failed to load churches.</p>

    const decoded = decodeToken(token)

    return (
        <section className="dashboard">
            <h1 className="user__title">{decoded?.username}'s Dashboard</h1>
            <h2>My Churches</h2>

            {/* Create church */}
            <form onSubmit={handleCreateChurch}>
                <input
                    type="text"
                    placeholder="New church name"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                />
                <button type="submit" disabled={createChurch.isPending}>
                    {createChurch.isPending ? "Creating..." : "Add Church"}
                </button>
            </form>

            {/* Edit church inline */}
            {editingChurch && (
                <form onSubmit={handleUpdateChurch}>
                    <input
                        type="text"
                        value={editingChurch.name}
                        onChange={(e) => setEditingChurch({ ...editingChurch, name: e.target.value })}
                    />
                    <button type="submit" disabled={updateChurch.isPending}>Save</button>
                    <button type="button" onClick={() => setEditingChurch(null)}>Cancel</button>
                </form>
            )}

            <ul>
                {churches?.map((church) => (
                    <li 
                    key={church.id}
                    className="church__list"
                    >
                        <span
                            style={{ cursor: "pointer", fontWeight: selectedChurchId === church.id ? "bold" : "normal" }}
                            onClick={() => setSelectedChurchId(church.id)}
                            className="church__list-item"
                        >
                            {church.name} ({church.total_members} members)
                            <div className="church__list-buttons">
                                <button onClick={() => setEditingChurch({ id: church.id, name: church.name })}>Edit</button>
                                <button onClick={() => deleteChurch.mutate(church.id)}>Delete</button>
                            </div>
                        </span>
                    </li>
                ))}
            </ul>

            {/* Members of selected church */}
            {selectedChurchId && (
                <section>
                    <h3>Members</h3>
                    <form onSubmit={handleAddMember}>
                        <input
                            type="text"
                            placeholder="New member name"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                        <button type="submit" disabled={addMember.isPending}>Add Member</button>
                    </form>
                    <ul>
                        {members?.map((member) => (
                            <li key={member.id}>
                                {member.name}
                                <button onClick={() =>
                                    removeMember.mutate({ churchId: selectedChurchId, id: member.id })
                                }>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </section>
    )
}

export default AdminView