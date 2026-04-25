import { Link, useLoaderData } from "react-router";

const JobDetails = () => {
    const { _id,title, company } = useLoaderData()

    return (
        <div>
            <h2>{title}</h2>
            <h2>{company}</h2>
            <Link to={`/jobApply/${_id}`}>
                <button className="btn bg-blue-400">Apply Now</button>
            </Link>
        </div>
    );
};

export default JobDetails;