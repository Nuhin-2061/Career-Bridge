import { Link, useParams } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";


const JobApply = () => {
    const { id: jobId } = useParams();
    const { user } = UseAuth();
    console.log(jobId, user)

    const handleApplyFormSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;
        const application = {
            jobId,
            applicant: user.email,
            linkedin,
            github,
            resume
        }
        if (!linkedin.trim() || !github.trim() || !resume.trim()) {
            Swal.fire({
                icon: "error",
                title: "Please provide all informations",
                showClass: {
                    popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                },
                hideClass: {
                    popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                }
            });
            return;
        }


        axios.post('https://career-bridge-server-pink.vercel.app/applications', application)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        theme: 'dark',
                        title: "Your application has been submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    theme: 'dark',
                    title: error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });


    }

    return (
        <section className="px-4 md:px-16 my-10 lg:px-24 xl:px-32 w-full">
            <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">Application Form</p>
            <h3 className="text-3xl font-semibold text-white text-center mx-auto mt-4">Apply for this job: <Link className="text-blue-500 hover:underline" to={`/jobs/${jobId}`}>Details</Link></h3>
            <form onSubmit={handleApplyFormSubmit} className="grid grid-cols-1 gap-3 sm:gap-5 border border-slate-700 p-5 rounded-2xl max-w-2xl mx-auto text-slate-300 mt-16 w-full">
                <div>
                    <p className="mb-2 font-medium">Your linkedin</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-pink-500">
                        <input placeholder="Your linkedin profile link" className="w-full p-3 bg-transparent outline-none" type="url" name="linkedin" />
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-medium">GitHub</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-pink-500">

                        <input placeholder="Your github link" className="w-full p-3 bg-transparent outline-none" type="url" name="github" />
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-medium">Resume</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-pink-500">

                        <input placeholder="Your github link" className="w-full p-3 bg-transparent outline-none" type="url" name="resume" />
                    </div>
                </div>
                <button type="submit" className="w-max cursor-pointer flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-xl">
                    Apply
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-5" aria-hidden="true">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </button>
            </form>
        </section>
    );
};

export default JobApply;