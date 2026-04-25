import { use } from "react";
import { Link } from "react-router";


const JobsList = ({ jobsCreatedByPromise }) => {
    const jobs = use(jobsCreatedByPromise)
    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
                Total jobs created by you :
                <span className="text-indigo-400 ml-2">{jobs.length}</span>
            </h2>

            <div className="overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-white/5 border border-white/10">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-white/10 text-gray-400 tracking-wider">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Job Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Deadline</th>
                            <th className="px-6 py-4">Counts</th>
                            <th className="px-6 py-4">View Applications</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job, index) => (
                            <tr
                                key={job._id}
                                className="border-b border-white/10 hover:bg-indigo-500/10 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                                style={{
                                    animation: `fadeIn 0.4s ease forwards`,
                                    animationDelay: `${index * 0.05}s`,
                                    opacity: 0,
                                }}
                            >
                                <td className="px-6 py-4 font-medium text-gray-400">
                                    {index + 1}
                                </td>

                                <td className="px-6 py-4 font-semibold text-white">
                                    {job.title}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-600/30 text-indigo-300">
                                        {job.category}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-400">
                                    {new Date(job.applicationDeadline).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-gray-400">
                                   {job.application_count}
                                </td>
                                <td className="px-6 py-4 font-semibold text-white">
                                    <Link to={`/applications/${job._id}`}>View Applications</Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Animation style */}
            <style>
                {`
      @keyframes fadeIn {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `}
            </style>
        </div>

    );
};

export default JobsList;