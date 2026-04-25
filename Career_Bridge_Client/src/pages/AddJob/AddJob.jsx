
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";


const AddJob = () => {

    const { user } = UseAuth();


    const handleAddJob = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data)


        const requiredFields = [
            'title',
            'location',
            'jobType',
            'category',
            'applicationDeadline',
            'description',
            'company',
            'requirements',
            'responsibilities',
            'hr_email',
            'hr_name',
            'company_logo'
        ];

        for (let field of requiredFields) {
            if (!data[field]?.trim()) {
                Swal.fire({
                    icon: "error",
                    title: `${field.replace('_', ' ')} is required`,
                });
                return;
            }
        }

        // salary validation
        if (!min || !max || !currency) {
            Swal.fire({
                icon: "error",
                title: "Complete salary information is required",
            });
            return;
        }


        // process salary range data
        const { min, max, currency, ...newJob } = data;
        newJob.salaryRange = { min, max, currency };

        // process requirements
        const requirementsString = newJob.requirements;
        const requirementsDirty = requirementsString.split(',');
        const requirementsClean = requirementsDirty.map(req => req.trim());
        newJob.requirements = requirementsClean;

        // process responsibilities
        newJob.responsibilities = newJob.responsibilities.split(',').map(res => res.trim());

        newJob.status = "active";



        // save data to db
        axios.post('https://career-bridge-server-pink.vercel.app/jobs', newJob)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }

            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: error,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    return (
        <section className="px-4 md:px-16 my-10 lg:px-24 xl:px-32 w-full">
            <p className="text-center font-medium text-pink-600 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto">Post a Job</p>
            <form
                onSubmit={handleAddJob}
                className="grid grid-cols-1 gap-4 sm:gap-5 border border-slate-700 p-6 rounded-2xl max-w-2xl mx-auto text-slate-300 mt-10 w-full"
            >
                {/* Title */}
                <div>
                    <p className="mb-2 font-medium">Job Title</p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Job title"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <p className="mb-2 font-medium">Location</p>
                    <input
                        type="text"
                        name="location"
                        placeholder="Job location"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Job Type */}
                <div>
                    <p className="mb-2 font-medium">Job Type</p>

                    <div className="relative">
                        <select
                            name="jobType"
                            className="appearance-none w-full p-3 pr-10  text-slate-300 border border-slate-700 rounded-lg outline-none focus:border-pink-500 cursor-pointer"
                            defaultValue=""
                        >
                            <option value="" disabled className="bg-slate-900 text-slate-400">
                                Select type
                            </option>
                            <option className="bg-slate-900">Full-time</option>
                            <option className="bg-slate-900">Part-time</option>
                            <option className="bg-slate-900">Contractual</option>
                            <option className="bg-slate-900">Internship</option>
                        </select>

                        {/* Custom Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>


                {/* Category */}
                <div>
                    <p className="mb-2 font-medium">Category</p>
                    <input
                        type="text"
                        name="category"
                        placeholder="Job category"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Deadline */}
                <div>
                    <p className="mb-2 font-medium">Application Deadline</p>
                    <input
                        type="date"
                        name="applicationDeadline"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2 font-medium">Salary Min</p>
                        <input
                            type="number"
                            name="min"
                            placeholder="Minimum salary"
                            className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                        />
                    </div>
                    <div>
                        <p className="mb-2 font-medium">Salary Max</p>
                        <input
                            type="number"
                            name="max"
                            placeholder="Maximum salary"
                            className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                        />
                    </div>
                </div>

                {/* Currency */}
                <div>
                    <p className="mb-2 font-medium">Currency</p>
                    <input
                        type="text"
                        name="currency"
                        placeholder="bdt"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <p className="mb-2 font-medium">Job Description</p>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Job description"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500 resize-none"
                    ></textarea>
                </div>

                {/* Company */}
                <div>
                    <p className="mb-2 font-medium">Company Name</p>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company name"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Requirements */}
                <div>
                    <p className="mb-2 font-medium">Requirements (comma separated)</p>
                    <input
                        type="text"
                        name="requirements"
                        placeholder="WordPress, SEO, Google Docs"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Responsibilities */}
                <div>
                    <p className="mb-2 font-medium">Responsibilities (comma separated)</p>
                    <input
                        type="text"
                        name="responsibilities"
                        placeholder="Write blog posts, Create social media content"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* HR Email */}
                <div>
                    <p className="mb-2 font-medium">HR Email</p>
                    <input
                        type="email"
                        name="hr_email"
                        placeholder="HR email"
                        defaultValue={user.email}
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* HR Name */}
                <div>
                    <p className="mb-2 font-medium">HR Name</p>
                    <input
                        type="text"
                        name="hr_name"
                        placeholder="HR name"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                {/* Company Logo */}
                <div>
                    <p className="mb-2 font-medium">Company Logo URL</p>
                    <input
                        type="url"
                        name="company_logo"
                        placeholder="Logo link"
                        className="w-full p-3 bg-transparent outline-none border border-slate-700 rounded-lg focus:border-pink-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-max cursor-pointer flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-xl"
                >
                    Submit Job
                </button>
            </form>

        </section>
    );
};

export default AddJob;