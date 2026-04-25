
import JobCard from "../Shared/JobCard";


const HotJobs = ({ jobs }) => {
    return (
        <div className="my-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {jobs.map(job => (
                    <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
        </div>
    );
};

export default HotJobs;