export const myApplicationsPromise = email => {
    return fetch(`https://career-bridge-server-pink.vercel.app/applications?email=${email}`, {
        credentials: 'include'
    })
        .then(res => res.json())
}