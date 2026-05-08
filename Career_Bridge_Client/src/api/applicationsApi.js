import { API_BASE_URL } from "./apiBase";
import { demoJobs } from "../data/demoJobs";

const demoApplications = (email) => demoJobs.slice(0, 2).map((job, index) => ({
    _id: `demo-my-application-${index + 1}`,
    jobId: job._id,
    applicant: email,
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    resume: "https://example.com/resume.pdf",
    status: index === 0 ? "pending" : "interview",
    createdAt: new Date().toISOString(),
    company: job.company,
    title: job.title,
    company_logo: job.company_logo,
    category: job.category,
    applicationDeadline: job.applicationDeadline
}));

export const myApplicationsPromise = email => {
    return fetch(`${API_BASE_URL}/applications?email=${email}`, {
        credentials: 'include'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load applications");
            }
            return res.json();
        })
        .then(data => Array.isArray(data) && data.length ? data : demoApplications(email))
        .catch(error => {
            console.error(error);
            return demoApplications(email);
        })
}
