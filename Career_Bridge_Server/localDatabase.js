const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'database.json');

const now = () => new Date().toISOString();

const seedData = {
    jobs: [
        {
            id: crypto.randomUUID(),
            title: 'Frontend Developer',
            location: 'Dhaka, Bangladesh',
            job_type: 'Full-time',
            category: 'Engineering',
            application_deadline: '2026-06-30',
            description: 'Build polished React interfaces for a modern job platform.',
            company: 'Career Bridge',
            requirements: ['React', 'JavaScript', 'Tailwind CSS'],
            responsibilities: ['Develop UI features', 'Fix frontend bugs', 'Collaborate with product'],
            hr_email: 'admin@careerbridge.local',
            hr_name: 'Career Bridge HR',
            company_logo: 'https://placehold.co/120x120?text=CB',
            salary_range: { min: '35000', max: '70000', currency: 'BDT' },
            status: 'active',
            created_at: now()
        },
        {
            id: crypto.randomUUID(),
            title: 'Backend Developer',
            location: 'Remote',
            job_type: 'Contractual',
            category: 'Engineering',
            application_deadline: '2026-07-15',
            description: 'Create APIs and maintain the local database layer.',
            company: 'Career Bridge',
            requirements: ['Node.js', 'Express', 'REST API'],
            responsibilities: ['Build API endpoints', 'Improve server reliability', 'Document changes'],
            hr_email: 'admin@careerbridge.local',
            hr_name: 'Career Bridge HR',
            company_logo: 'https://placehold.co/120x120?text=CB',
            salary_range: { min: '45000', max: '90000', currency: 'BDT' },
            status: 'active',
            created_at: now()
        }
    ],
    applications: []
};

const ensureDatabase = async () => {
    await fs.mkdir(dataDir, { recursive: true });
    try {
        await fs.access(dataFile);
    } catch {
        await fs.writeFile(dataFile, JSON.stringify(seedData, null, 2));
    }
};

const readDatabase = async () => {
    await ensureDatabase();
    const raw = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(raw);
};

const writeDatabase = async (database) => {
    await fs.writeFile(dataFile, JSON.stringify(database, null, 2));
};

const sortNewest = (items) => [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

const localDatabase = {
    async getJobs(email) {
        const database = await readDatabase();
        const jobs = email ? database.jobs.filter((job) => job.hr_email === email) : database.jobs;
        return sortNewest(jobs);
    },

    async getJobsWithApplicationCount(email) {
        const database = await readDatabase();
        return sortNewest(database.jobs.filter((job) => !email || job.hr_email === email)).map((job) => ({
            ...job,
            application_count: database.applications.filter((application) => application.job_id === job.id).length
        }));
    },

    async getJobById(id) {
        const database = await readDatabase();
        return database.jobs.find((job) => job.id === id) || null;
    },

    async createJob(payload) {
        const database = await readDatabase();
        const job = {
            id: crypto.randomUUID(),
            ...payload,
            status: payload.status || 'active',
            created_at: now()
        };
        database.jobs.push(job);
        await writeDatabase(database);
        return job;
    },

    async getApplicationsByApplicant(email) {
        const database = await readDatabase();
        return database.applications
            .filter((application) => application.applicant === email)
            .map((application) => ({
                ...application,
                jobs: database.jobs.find((job) => job.id === application.job_id) || null
            }));
    },

    async getApplicationsByJob(jobId) {
        const database = await readDatabase();
        return database.applications.filter((application) => application.job_id === jobId);
    },

    async createApplication(payload) {
        const database = await readDatabase();
        const application = {
            id: crypto.randomUUID(),
            ...payload,
            status: payload.status || 'pending',
            created_at: now()
        };
        database.applications.push(application);
        await writeDatabase(database);
        return application;
    },

    async updateApplicationStatus(id, status) {
        const database = await readDatabase();
        const application = database.applications.find((item) => item.id === id);
        if (!application) {
            return 0;
        }
        application.status = status;
        await writeDatabase(database);
        return 1;
    }
};

module.exports = localDatabase;
