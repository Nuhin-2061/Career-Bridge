import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import BrowseByCategory from './BrowseByCategory';
import HotJobs from './HotJobs';
import Loader from '../Shared/Loader';
import JobsOfTheDay from './JobsOfTheDay';
import SubscribeSection from './SubscribeSection';
import { API_BASE_URL } from '../../api/apiBase';
import { demoJobs } from '../../data/demoJobs';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/jobs`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load jobs');
                }
                return res.json();
            })
            .then(data => {
                setJobs(Array.isArray(data) && data.length ? data : demoJobs);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setJobs(demoJobs);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Banner />
            <BrowseByCategory />
            <JobsOfTheDay />

            {loading && <Loader></Loader>}

            {!loading && (
                <HotJobs jobs={jobs} />
            )}
            <SubscribeSection></SubscribeSection>
        </div>
    );
};

export default Home;
