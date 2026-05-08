import { API_BASE_URL } from "../api/apiBase";
import { demoJobs } from "./demoJobs";

export const getDemoJobById = (id) => demoJobs.find((job) => job._id === id) || demoJobs[0];

export const loadJobById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
        if (!response.ok) {
            throw new Error("Job not found");
        }
        const job = await response.json();
        return job?._id ? job : getDemoJobById(id);
    } catch (error) {
        console.error(error);
        return getDemoJobById(id);
    }
};

export const loadApplicationsByJobId = async (jobId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/jobs/${jobId}`);
        if (!response.ok) {
            throw new Error("Applications not found");
        }
        const applications = await response.json();
        if (Array.isArray(applications) && applications.length) {
            return applications;
        }
    } catch (error) {
        console.error(error);
    }

    const job = getDemoJobById(jobId);
    return [
        {
            _id: `demo-application-${job._id}`,
            jobId: job._id,
            applicant: "candidate@careerbridge.local",
            linkedin: "https://www.linkedin.com/",
            github: "https://github.com/",
            resume: "https://example.com/resume.pdf",
            status: "pending",
            createdAt: new Date().toISOString()
        }
    ];
};
