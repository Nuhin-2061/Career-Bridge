import { API_BASE_URL } from "./apiBase";
import { demoJobs } from "../data/demoJobs";

export const jobsCreatedByPromise = email => {
    return fetch(`${API_BASE_URL}/jobs/applications?email=${email}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load posted jobs");
            }
            return res.json();
        })
        .then(data => Array.isArray(data) && data.length
            ? data
            : demoJobs.map(job => ({ ...job, hr_email: email, application_count: 1 })))
        .catch(error => {
            console.error(error);
            return demoJobs.map(job => ({ ...job, hr_email: email, application_count: 1 }));
        })
}
