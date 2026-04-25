import Lottie from "lottie-react";
import { Link } from "react-router";
import register from "../../assets/lotties/register.json";
import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";


const Register = () => {

    const { createUser } = use(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value
        console.log(name, email, password);

        // create user
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                form.reset();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="justify-items-center min-h-screen px-4 py-12">
            {/* Soft Backdrop*/}
            <div className='fixed inset-0 -z-1 pointer-events-none'>
                <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl' />
                <div className='absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl' />
            </div>
            <div className="flex items-center justify-center w-full md:w-2/3 text-center bg-white/6 border border-white/10 rounded-2xl p-8">
                <div className="flex-1">
                    <form
                        onSubmit={handleRegister}
                    >
                        <h1 className="text-white text-3xl mt-10 font-medium">
                            Register
                        </h1>
                        <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                            <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none " required />
                        </div>


                        <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                            <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none" required />
                        </div>

                        <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
                            <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none" required />
                        </div>
                        <button type="submit" className="mt-4 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer" >
                            Register
                        </button>

                        <p className="text-gray-400 text-sm mt-3 mb-2 cursor-pointer" >
                            Already have an account?
                            <Link to="/signin">
                                <span className="text-indigo-400 hover:underline ml-1">click here</span>
                            </Link>
                        </p>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
                <div className="hidden md:block flex-1 md:w-1/2 lg:w-3/5">
                    <Lottie animationData={register} loop={true} style={{ height: 350 }} />
                </div>
            </div>
        </div>
    )
};

export default Register;