import { Mail } from 'lucide-react';
import React from 'react';

const SubscribeSection = () => {
    return (
        <section className="relative my-10 bg-blue-600 text-white rounded-xl p-8 md:p-10 flex flex-col items-center justify-center overflow-hidden">
            {/* Decorative images */}
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgh_h51mdIOhIO15LnHmpfoHITqv5ky-nzOw&s"
                alt="Team 1"
                className="absolute top-2 left-2 w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-lg"
            />
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnHtLyfbPEs6xhmDzGqkrIG-LF0SEjaipvg&s"
                alt="Team 2"
                className="absolute top-16 left-32 w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-lg"
            />
            <img
                src="https://img.freepik.com/premium-photo/happy-black-woman-meeting-with-business-partner_236854-14901.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Team 3"
                className="absolute bottom-2 left-2 w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-lg"
            />
            <img
                src="https://img.freepik.com/free-photo/cherful-positive-young-colleagues-using-laptop-computer_171337-754.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Team 4"
                className="absolute top-2 right-2 w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-lg"
            />
            <img
                src="https://media.istockphoto.com/id/1141465434/photo/attending-a-conference-to-develop-their-careers.jpg?s=612x612&w=0&k=20&c=UJ69AL1_TpUaGZLc7dFrJp0QL8SuNBurpMwBQJHCjUg="
                alt="Team 5"
                className="absolute bottom-4 right-2 w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-lg"
            />

            {/* Text */}
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 px-4">
                New Things Will Always <br /> Update Regularly
            </h2>

            {/* Email input + button */}
            <div className="flex flex-col sm:flex-row w-full max-w-md gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg pl-4 py-2 w-full">
                    <Mail className="text-gray-400" />
                    <input
                        type="email"
                        placeholder="Enter your email here"
                        className="bg-white text-gray-700 w-full outline-none"
                    />
                </div>
                <button className="bg-blue-700 cursor-pointer hover:bg-blue-800 px-6 py-2 rounded-lg font-semibold w-full sm:w-auto">
                    Subscribe
                </button>
            </div>
        </section>
    );
};

export default SubscribeSection;
