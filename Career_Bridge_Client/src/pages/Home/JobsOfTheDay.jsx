import React from 'react';

const JobsOfTheDay = () => {
    const categories = [
        {
            categotyId: 1,
            categotyName: "Management",
            categotyIcon: ""
        },
        {
            categotyId: 2,
            categotyName: "Marketing & Sale",
            categotyIcon: ""
        },
        {
            categotyId: 3,
            categotyName: "Finance",
            categotyIcon: ""
        },
        {
            categotyId: 4,
            categotyName: "Human Resource",
            categotyIcon: ""
        },
        {
            categotyId: 5,
            categotyName: "Retail & Products",
            categotyIcon: ""
        },
        {
            categotyId: 6,
            categotyName: "Content Writer",
            categotyIcon: ""
        },
    ]
    return (
        <div>
            <div className="flex flex-col items-center gap-5 my-10">
                <h2 className="text-3xl font-semibold">Jobs of the day</h2>
                <p>Search and connect with the right candidates faster.</p>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-2 md:max-w-4xl mx-auto'>
                {
                    categories.map(category => (
                        <div key={category.categotyId} className='flex items-center justify-center gap-1 border-2 border-gray-500 p-2 rounded-xl text-center cursor-pointer hover:border-gray-400 text-gray-500 hover:text-gray-400 transition duration-300'>
                            {category.categotyName}
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default JobsOfTheDay;