import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/Signin/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "../routes/PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../ViewApplications/ViewApplications";
import { API_BASE_URL } from "../api/apiBase";
import { loadApplicationsByJobId, loadJobById } from "../data/jobLoaders";
import Pricing from "../pages/Pricing/Pricing";
import Docs from "../pages/Docs/Docs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/jobs/:id",
                element: <JobDetails></JobDetails>,
                loader: ({ params }) => loadJobById(params.id)
            },
            {
                path: "/jobApply/:id",
                element: <PrivateRoute><JobApply></JobApply></PrivateRoute>,
                loader: ({ params }) => loadJobById(params.id)
            },
            {
                path: "myapplications",
                element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
            },
            {
                path: "applications/:job_id",
                element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
                loader: ({ params }) => loadApplicationsByJobId(params.job_id)
            },
            {
                path: "addjob",
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: "mypostedjobs",
                element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/docs",
                element: <Docs></Docs>
            },
        ]
    },
], {
    basename: '/Career-Bridge/'
});

export default router;
