import { motion } from "framer-motion";
import banner from "../../assets/banner.jpg";
import banner2 from "../../assets/banner2.jpg";;

const Banner = () => {
    return (
        <section className="relative overflow-hidden pb-20 mt-20 ">

            {/* SVG Background */}
            <svg
                className="absolute -z-10 inset-0 w-full h-full"
                viewBox="0 0 1440 720"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path stroke="#1D293D" strokeOpacity=".7" d="M-15.227 702.342H1439.7" />
                <circle cx="711.819" cy="372.562" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
                <circle cx="16.942" cy="20.834" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
                <path stroke="#1D293D" strokeOpacity=".7" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
                <circle cx="782.595" cy="411.166" r="308.334" stroke="#1D293D" strokeOpacity=".7" />
            </svg>

            <div className="flex flex-col md:flex-row items-center gap-16">

                {/* Left Content */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-medium max-w-xl text-slate-50 leading-tight">
                        Discover
                        <motion.span
                            animate={
                                { color: ["#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Jobs
                        </motion.span>. Discover Growth
                    </h1>

                    <p className="text-sm text-slate-300 max-w-lg mt-4">
                        Discover jobs, connect with top employers, and build your career with confidence using CareerBridge.
                    </p>

                    <div className="flex items-center gap-4 mt-8 text-sm">
                        <button className="bg-white text-black rounded-md px-7 h-11 hover:bg-slate-200 transition">
                            Get Started
                        </button>
                        <button className="border border-slate-600 text-white rounded-md px-6 h-11 hover:bg-white/10 transition">
                            Browse Jobs
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div>
                    <motion.img
                        animate={{ y: [100, 120, 100] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        src={banner}
                        alt="hero"
                        className="max-w-xs border-gray-400 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl sm:max-w-sm lg:max-w-sm"
                    />
                    <motion.img
                        animate={{ x: [100, 130, 100] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                        src={banner2}
                        alt="hero"
                        className="max-w-xs border-gray-400 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl sm:max-w-sm lg:max-w-sm"
                    />
                </div>
            </div>
        </section >
    );
};

export default Banner;