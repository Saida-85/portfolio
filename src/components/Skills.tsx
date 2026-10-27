import SkillsGlobe from "./SkillsGlobe";

export default function Skills() {
    return (
        <section
            id="skills"
            className="section-space container-shell text-center"
        >
            <p className="section-label">Tech Stack</p>
            <h2 className="section-heading">My Skills</h2>

            <div className="mx-auto mt-8 aspect-square w-full max-w-[520px]">
                <SkillsGlobe />
            </div>

            <div className="glass-card mx-auto mt-8 grid max-w-3xl gap-5 rounded-2xl p-6 text-left sm:grid-cols-2 sm:p-8">
                <div>
                    <h3 className="font-bold text-cyan-200">Frontend</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                        HTML, CSS, Tailwind CSS, TypeScript, React, Next.js
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-violet-200">
                        Backend &amp; Database
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                        Node.js, BetterAuth, MongoDB
                    </p>
                </div>
            </div>
        </section>
    );
}