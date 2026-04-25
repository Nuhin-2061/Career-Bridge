import axios from "axios";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";


const ViewApplications = () => {
    const { job_id } = useParams();
    const applications = useLoaderData();


    const handleStatusChange = (e, app_id) => {
        axios.patch(`https://career-bridge-server-pink.vercel.app/applications/${app_id}`, { status: e.target.value })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="my-10">
            <h1 className="my-3 font-semibold text-2xl">{applications.length} applications for the job id : {job_id}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {
                    applications.map(app => (
                        <div key={app._id} className="border-2 border-purple-500 bg-purple-500/20 p-3 rounded-lg hover:border-purple-600 cursor-pointer transition duration-300 hover:scale-105">
                            <p>Job No. {app.jobId}</p>
                            <h1 className="text-lg">Applicants Email : {app.applicant}</h1>

                            <div className="w-full my-2">
                                <select
                                    id="status"
                                    name="status"
                                    onChange={(e) => handleStatusChange(e, app._id)}
                                    defaultValue={app.status || ""}
                                    className="select w-fullbg-purple-500/20text-white border border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md p-2 rounded-lg backdrop-blur-md"
                                >
                                    <option value="" disabled>
                                        Update Status
                                    </option>

                                    <option value="Pending" className="text-black bg-white">
                                        Pending
                                    </option>
                                    <option value="Interview" className="text-black bg-white">
                                        Interview
                                    </option>
                                    <option value="Hired" className="text-black bg-white">
                                        Hired
                                    </option>
                                    <option value="Rejected" className="text-black bg-white">
                                        Rejected
                                    </option>
                                </select>

                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ViewApplications;