import { API_BASE_URL } from "./apiBase";

export const jobsCreatedByPromise = email => {
    return fetch(`${API_BASE_URL}/jobs/applications?email=${email}`)
        .then(res => res.json())
}
