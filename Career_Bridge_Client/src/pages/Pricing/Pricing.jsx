const Pricing = () => {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            details: ["Browse jobs", "Apply with profile links", "Track applications"]
        },
        {
            name: "Recruiter",
            price: "999 BDT",
            details: ["Post unlimited jobs", "Review applicants", "Update hiring status"]
        },
        {
            name: "Business",
            price: "Custom",
            details: ["Team hiring workspace", "Priority support", "Custom reporting"]
        }
    ];

    return (
        <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-10 text-slate-200">
            <div className="max-w-5xl mx-auto text-center">
                <p className="text-pink-400 font-medium">Pricing</p>
                <h1 className="text-4xl font-semibold text-white mt-2">Simple plans for Career Bridge</h1>
                <p className="text-slate-400 mt-3">Default plans are ready so this page works without any backend setup.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
                {plans.map((plan) => (
                    <div key={plan.name} className="border border-slate-700 rounded-2xl p-6 bg-zinc-900/70">
                        <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                        <p className="text-3xl font-bold text-pink-400 my-5">{plan.price}</p>
                        <div className="space-y-3">
                            {plan.details.map((item) => (
                                <p key={item} className="text-slate-300">{item}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
