export const demoJobs = [
    {
        _id: "demo-frontend-developer",
        title: "Frontend Developer",
        location: "Dhaka, Bangladesh",
        jobType: "Full-time",
        category: "Engineering",
        applicationDeadline: "2026-06-30",
        description: "Build polished React interfaces for a modern job platform.",
        company: "Career Bridge",
        requirements: ["React", "JavaScript", "Tailwind CSS"],
        responsibilities: ["Develop UI features", "Fix frontend bugs", "Collaborate with product"],
        hr_email: "admin@careerbridge.local",
        hr_name: "Career Bridge HR",
        company_logo: "https://placehold.co/120x120?text=CB",
        salaryRange: { min: "35000", max: "70000", currency: "BDT" },
        status: "active",
        createdAt: new Date().toISOString()
    },
    {
        _id: "demo-backend-developer",
        title: "Backend Developer",
        location: "Remote",
        jobType: "Contractual",
        category: "Engineering",
        applicationDeadline: "2026-07-15",
        description: "Create APIs and maintain the local database layer.",
        company: "Career Bridge",
        requirements: ["Node.js", "Express", "REST API"],
        responsibilities: ["Build API endpoints", "Improve server reliability", "Document changes"],
        hr_email: "admin@careerbridge.local",
        hr_name: "Career Bridge HR",
        company_logo: "https://placehold.co/120x120?text=CB",
        salaryRange: { min: "45000", max: "90000", currency: "BDT" },
        status: "active",
        createdAt: new Date().toISOString()
    }
];
