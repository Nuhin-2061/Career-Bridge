const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js');
const localDatabase = require('./localDatabase');
require('dotenv').config();

const app = express();

// middleware
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,https://career-bridge-23cd9.web.app')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

const isAdminEmail = (email) => adminEmails.length === 0 || adminEmails.includes(email);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const jwtSecret = process.env.JWT_ACCESS_SECRET;
if (!jwtSecret) {
    throw new Error('Missing JWT_ACCESS_SECRET in environment');
}
const hasSupabaseConfig = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabase = hasSupabaseConfig
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
    )
    : null;

if (!hasSupabaseConfig) {
    console.log('Supabase credentials not found. Using the automatic local JSON database.');
}

const mapJobFromDb = (job) => ({
    _id: job.id,
    title: job.title,
    location: job.location,
    jobType: job.job_type,
    category: job.category,
    applicationDeadline: job.application_deadline,
    description: job.description,
    company: job.company,
    requirements: job.requirements || [],
    responsibilities: job.responsibilities || [],
    hr_email: job.hr_email,
    hr_name: job.hr_name,
    company_logo: job.company_logo,
    salaryRange: job.salary_range,
    status: job.status,
    createdAt: job.created_at
});

const mapJobToDb = (job) => ({
    title: job.title,
    location: job.location,
    job_type: job.jobType,
    category: job.category,
    application_deadline: job.applicationDeadline,
    description: job.description,
    company: job.company,
    requirements: job.requirements,
    responsibilities: job.responsibilities,
    hr_email: job.hr_email,
    hr_name: job.hr_name,
    company_logo: job.company_logo,
    salary_range: job.salaryRange,
    status: job.status
});

const mapApplicationFromDb = (application) => ({
    _id: application.id,
    jobId: application.job_id,
    applicant: application.applicant,
    linkedin: application.linkedin,
    github: application.github,
    resume: application.resume,
    status: application.status,
    createdAt: application.created_at
});

// logger
const logger = (req, res, next) => {
    console.log('inside logger middleware');
    next();
};

// verify token
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.decoded = decoded;
        next();
    });
};

// home route
app.get('/', (req, res) => {
    res.send('CareerBridge server is running!');
});

// JWT route
app.post('/jwt', async (req, res) => {
    const userData = req.body;
    if (!isAdminEmail(userData?.email)) {
        return res.status(403).send({ message: 'forbidden access' });
    }

    const token = jwt.sign(userData, jwtSecret, {
        expiresIn: '1d'
    });

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax'
    });

    res.send({ success: true });
});

// all jobs
app.get('/jobs', async (req, res) => {
    const email = req.query.email;
    if (!supabase) {
        const jobs = await localDatabase.getJobs(email);
        return res.send(jobs.map(mapJobFromDb));
    }

    let query = supabase.from('jobs').select('*').order('created_at', { ascending: false });
    if (email) {
        query = query.eq('hr_email', email);
    }

    const { data, error } = await query;
    if (error) {
        return res.status(500).send({ message: error.message });
    }

    res.send(data.map(mapJobFromDb));
});

// jobs with application count
app.get('/jobs/applications', async (req, res) => {
    const email = req.query.email;
    if (!supabase) {
        const jobs = await localDatabase.getJobsWithApplicationCount(email);
        return res.send(jobs.map((job) => {
            const mapped = mapJobFromDb(job);
            mapped.application_count = job.application_count || 0;
            return mapped;
        }));
    }

    const { data, error } = await supabase
        .from('jobs')
        .select('*, applications(count)')
        .eq('hr_email', email)
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    const jobs = data.map((job) => {
        const mapped = mapJobFromDb(job);
        mapped.application_count = job.applications?.[0]?.count || 0;
        return mapped;
    });

    res.send(jobs);
});

// single job
app.get('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    if (!supabase) {
        const job = await localDatabase.getJobById(id);
        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }
        return res.send(mapJobFromDb(job));
    }

    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).send({ message: 'Job not found' });
    }

    res.send(mapJobFromDb(data));
});

// add job
app.post('/jobs', async (req, res) => {
    const payload = mapJobToDb(req.body);
    if (!supabase) {
        const job = await localDatabase.createJob(payload);
        return res.send({ insertedId: job.id });
    }

    const { data, error } = await supabase
        .from('jobs')
        .insert(payload)
        .select('id')
        .single();

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    res.send({ insertedId: data.id });
});

// applications by applicant (protected)
app.get('/applications', logger, verifyToken, async (req, res) => {
    const email = req.query.email;

    if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
    }

    if (!supabase) {
        const data = await localDatabase.getApplicationsByApplicant(email);
        const applications = data.map((application) => {
            const mapped = mapApplicationFromDb(application);
            const job = application.jobs;
            if (job) {
                mapped.company = job.company;
                mapped.title = job.title;
                mapped.company_logo = job.company_logo;
                mapped.category = job.category;
                mapped.status = job.status;
                mapped.applicationDeadline = job.application_deadline;
            }
            return mapped;
        });
        return res.send(applications);
    }

    const { data, error } = await supabase
        .from('applications')
        .select('id, job_id, applicant, linkedin, github, resume, status, created_at, jobs (title, company, company_logo, category, status, application_deadline)')
        .eq('applicant', email);

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    const applications = data.map((application) => {
        const mapped = mapApplicationFromDb(application);
        const job = application.jobs;
        if (job) {
            mapped.company = job.company;
            mapped.title = job.title;
            mapped.company_logo = job.company_logo;
            mapped.category = job.category;
            mapped.status = job.status;
            mapped.applicationDeadline = job.application_deadline;
        }
        return mapped;
    });

    res.send(applications);
});

// applications for a job
app.get('/applications/jobs/:job_id', async (req, res) => {
    if (!supabase) {
        const applications = await localDatabase.getApplicationsByJob(req.params.job_id);
        return res.send(applications.map(mapApplicationFromDb));
    }

    const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('job_id', req.params.job_id);

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    res.send(data.map(mapApplicationFromDb));
});

// add application
app.post('/applications', async (req, res) => {
    const payload = {
        job_id: req.body.jobId,
        applicant: req.body.applicant,
        linkedin: req.body.linkedin,
        github: req.body.github,
        resume: req.body.resume,
        status: req.body.status || 'pending'
    };

    if (!supabase) {
        const application = await localDatabase.createApplication(payload);
        return res.send({ insertedId: application.id });
    }

    const { data, error } = await supabase
        .from('applications')
        .insert(payload)
        .select('id')
        .single();

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    res.send({ insertedId: data.id });
});

// update application status
app.patch('/applications/:id', async (req, res) => {
    const id = req.params.id;
    if (!supabase) {
        const modifiedCount = await localDatabase.updateApplicationStatus(id, req.body.status);
        return res.send({ modifiedCount });
    }

    const { data, error } = await supabase
        .from('applications')
        .update({ status: req.body.status })
        .eq('id', id)
        .select('id');

    if (error) {
        return res.status(500).send({ message: error.message });
    }

    res.send({ modifiedCount: data?.length ? 1 : 0 });
});

// module.exports = app;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CareerBridge server running on port ${PORT}`);
});
