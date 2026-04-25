import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import BrowseByCategory from './BrowseByCategory';
import HotJobs from './HotJobs';
import Loader from '../Shared/Loader';
import JobsOfTheDay from './JobsOfTheDay';
import SubscribeSection from './SubscribeSection';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://career-bridge-server-pink.vercel.app/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Banner />
            <BrowseByCategory />
            <JobsOfTheDay />

            {loading && <Loader></Loader>}

            {!loading && !error && (
                <HotJobs jobs={jobs} />
            )}

            {error && (
                <p className="text-red-500 text-center my-6">
                    Failed to load jobs. Server is not running.
                </p>
            )}
            <SubscribeSection></SubscribeSection>
        </div>
    );
};

export default Home;
