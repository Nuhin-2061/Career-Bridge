export const jobsCreatedByPromise = email => {
    return fetch(`https://career-bridge-server-pink.vercel.app/jobs/applications?email=${email}`)
        .then(res => res.json())
}
