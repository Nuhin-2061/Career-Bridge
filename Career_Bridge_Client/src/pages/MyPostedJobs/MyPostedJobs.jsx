import { Suspense } from "react";
import UseAuth from "../../hooks/UseAuth";
import JobsList from "./JobsList";
import { jobsCreatedByPromise } from "../../api/jobsApi";


const MyPostedJobs = () => {
    const { user } = UseAuth();
    return (
        <div className="my-10">
            <Suspense>
                <JobsList
                    jobsCreatedByPromise={jobsCreatedByPromise(user.email)}
                ></JobsList>
            </Suspense>
        </div>
    );
};

export default MyPostedJobs;