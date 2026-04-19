const BASE_URL = "http://localhost:3000/api/v1"

function getToken() {
    const session = localStorage.getItem("jwtSession")
    return session ? JSON.parse(session)?.token : null
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    }
}

async function handleResponse(res) {
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Request failed")
    return data
}

// Auth
export const loginUser = (body) =>
    fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(handleResponse)

export const signupUser = (body) =>
    fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(handleResponse)

// Churches
export const fetchChurches = () =>
    fetch(`${BASE_URL}/churches`, { headers: authHeaders() }).then(handleResponse)

export const fetchChurchById = (id) =>
    fetch(`${BASE_URL}/churches/${id}`, { headers: authHeaders() }).then(handleResponse)

export const postChurch = (body) =>
    fetch(`${BASE_URL}/churches`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body)
    }).then(handleResponse)

export const putChurch = ({ id, ...body }) =>
    fetch(`${BASE_URL}/churches/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body)
    }).then(handleResponse)

export const destroyChurch = (id) =>
    fetch(`${BASE_URL}/churches/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    }).then(handleResponse)

// Members
export const fetchMembers = (churchId) =>
    fetch(`${BASE_URL}/churches/${churchId}/members`, { headers: authHeaders() }).then(handleResponse)

export const fetchMemberById = ({ churchId, id }) =>
    fetch(`${BASE_URL}/churches/${churchId}/members/${id}`, { headers: authHeaders() }).then(handleResponse)

export const postMember = ({ churchId, ...body }) =>
    fetch(`${BASE_URL}/churches/${churchId}/members`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body)
    }).then(handleResponse)

export const putMember = ({ churchId, id, ...body }) =>
    fetch(`${BASE_URL}/churches/${churchId}/members/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body)
    }).then(handleResponse)

export const destroyMember = ({ churchId, id }) =>
    fetch(`${BASE_URL}/churches/${churchId}/members/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    }).then(handleResponse)