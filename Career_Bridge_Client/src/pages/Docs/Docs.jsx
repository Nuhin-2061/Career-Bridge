const Docs = () => {
    const sections = [
        {
            title: "Browse jobs",
            text: "Open the home page and use Show Details to view full job information."
        },
        {
            title: "Apply",
            text: "Sign in with a local account or Google demo login, then submit LinkedIn, GitHub, and resume links."
        },
        {
            title: "Post jobs",
            text: "Use Add Job to create a job. Without Supabase, the local server stores jobs automatically."
        }
    ];

    return (
        <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-10 text-slate-200">
            <div className="max-w-4xl mx-auto">
                <p className="text-pink-400 font-medium">Docs</p>
                <h1 className="text-4xl font-semibold text-white mt-2">Career Bridge guide</h1>
                <p className="text-slate-400 mt-3">These default docs keep the route ready while the project is running locally.</p>

                <div className="mt-8 space-y-4">
                    {sections.map((section) => (
                        <div key={section.title} className="border border-slate-700 rounded-xl p-5 bg-zinc-900/70">
                            <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                            <p className="text-slate-300 mt-2">{section.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Docs;
