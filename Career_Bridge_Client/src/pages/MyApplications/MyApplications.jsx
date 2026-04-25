import { Suspense } from "react";
import { myApplicationsPromise } from "../../api/applicationsApi";
import UseAuth from "../../hooks/UseAuth";
import Loader from "../Shared/Loader";
import ApplicationList from "./ApplicationList";
import ApplicationStats from "./ApplicationStats";


const MyApplications = () => {
    const { user } = UseAuth();
    return (
        <div className="my-10">
            <ApplicationStats></ApplicationStats>
            <Suspense fallback={<Loader></Loader>}>
                <ApplicationList
                    myApplicationsPromise={myApplicationsPromise(user.email)}
                >
                </ApplicationList>
            </Suspense>

        </div>
    );
};

export default MyApplications;