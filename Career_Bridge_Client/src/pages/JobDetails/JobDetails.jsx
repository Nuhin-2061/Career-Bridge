import { Link, useLoaderData } from "react-router";
import { BriefcaseBusiness, CalendarDays, CheckCircle2, Mail, MapPin, UserRound } from "lucide-react";

const JobDetails = () => {
    const {
        _id,
        title,
        company,
        company_logo,
        location,
        jobType,
        category,
        applicationDeadline,
        description,
        requirements = [],
        responsibilities = [],
        hr_email,
        hr_name,
        salaryRange = {}
    } = useLoaderData();

    return (
        <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-10 text-slate-200">
            <div className="max-w-5xl mx-auto border border-slate-700 rounded-2xl bg-zinc-900/70 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-slate-200 border border-slate-300 rounded-xl p-3 shrink-0">
                            <img className="w-14 h-14 object-contain" src={company_logo} alt={company} />
                        </div>
                        <div>
                            <p className="text-pink-400 font-medium">{category}</p>
                            <h1 className="text-3xl md:text-4xl font-semibold text-white mt-1">{title}</h1>
                            <p className="text-xl text-slate-300 mt-2">{company}</p>
                        </div>
                    </div>

                    <Link to={`/jobApply/${_id}`}>
                        <button className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-medium transition cursor-pointer">
                            Apply Now
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                    <div className="border border-slate-700 rounded-xl p-4">
                        <MapPin className="w-5 h-5 text-pink-400 mb-2" />
                        <p className="text-sm text-slate-400">Location</p>
                        <p className="font-medium">{location}</p>
                    </div>
                    <div className="border border-slate-700 rounded-xl p-4">
                        <BriefcaseBusiness className="w-5 h-5 text-pink-400 mb-2" />
                        <p className="text-sm text-slate-400">Job Type</p>
                        <p className="font-medium">{jobType}</p>
                    </div>
                    <div className="border border-slate-700 rounded-xl p-4">
                        <CalendarDays className="w-5 h-5 text-pink-400 mb-2" />
                        <p className="text-sm text-slate-400">Deadline</p>
                        <p className="font-medium">{applicationDeadline}</p>
                    </div>
                    <div className="border border-slate-700 rounded-xl p-4">
                        <p className="text-sm text-slate-400">Salary</p>
                        <p className="font-medium mt-2">
                            {salaryRange.min}-{salaryRange.max} {salaryRange.currency}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-3">Job Description</h2>
                            <p className="text-slate-300 leading-7">{description}</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-3">Responsibilities</h2>
                            <div className="space-y-3">
                                {responsibilities.map((item, index) => (
                                    <p key={index} className="flex gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-3">Requirements</h2>
                            <div className="flex flex-wrap gap-2">
                                {requirements.map((item, index) => (
                                    <span key={index} className="border border-slate-600 rounded-lg px-3 py-2 text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="border border-slate-700 rounded-xl p-5 h-max">
                        <h2 className="text-xl font-semibold text-white mb-4">Recruiter</h2>
                        <div className="space-y-4">
                            <p className="flex gap-3">
                                <UserRound className="w-5 h-5 text-pink-400 shrink-0" />
                                <span>{hr_name}</span>
                            </p>
                            <p className="flex gap-3 break-all">
                                <Mail className="w-5 h-5 text-pink-400 shrink-0" />
                                <span>{hr_email}</span>
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default JobDetails;
