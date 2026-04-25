import { BriefcaseBusiness, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const JobCard = ({ job }) => {
    const { _id, title, company_logo, requirements, description, applicationDeadline, jobType, salaryRange, company, location } = job;
    return (
        <div className="w-full text-gray-300 bg-zinc-800 border flex flex-col border-gray-400/50 p-6 rounded-xl transition-transform duration-300 hover:-translate-y-1.5">
            <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-100">
                <div className="flex flex-row items-start md:items-center gap-3">
                    <div className="bg-gray-300 border border-gray-200 rounded-lg p-2">
                        <img className='w-8 h-8' src={company_logo} alt={title} />
                    </div>
                    <div className='flex flex-col gap-2 items-start justify-center'>
                        <h3 className="text-2xl font-medium text-gray-50">
                            {company}
                        </h3>
                        <span className='flex items-center text-sm gap-1'> <MapPin className='w-4' /> {location}</span>
                    </div>
                </div>
            </div>
            <div className='my-4 space-y-2'>
                <h2 className='text-xl font-semibold'>{title}</h2>
                <div className='flex justify-between'>
                    <span className='flex items-center text-sm gap-1'> <BriefcaseBusiness className='w-4'/>{jobType}</span>
                    <span className='flex items-center text-sm gap-1'><Clock className='w-4'/>
                        {applicationDeadline}</span>
                </div>
            </div>
            <div className='text-justify'>
                {description.trim().split(/\s+/).slice(0, 15).join(" ")}
                {description.trim().split(/\s+/).length > 15 && "..."}
            </div>

            <div className="my-4 flex gap-2 items-center flex-wrap">
                {
                    requirements.map((req, i) => (
                        <span key={i} className='px-2 py-1 border rounded-lg text-xs text-gray-300'>{req}</span>
                    ))
                }
            </div>

            <div className='mt-auto my-3 flex justify-between gap-1 items-center'>
                <p className='text-sm'>{salaryRange.min}-{salaryRange.max} {salaryRange.currency}</p>
                <Link to={`/jobs/${_id}`}>
                    <button className="border w-full border-slate-600 text-white rounded-md py-2 px-3 hover:bg-white/10 transition cursor-pointer">
                        Show Details
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default JobCard;