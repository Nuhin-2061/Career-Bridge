import { API_BASE_URL } from "./apiBase";

export const myApplicationsPromise = email => {
    return fetch(`${API_BASE_URL}/applications?email=${email}`, {
        credentials: 'include'
    })
        .then(res => res.json())
}