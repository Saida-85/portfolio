import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/projects";

export default function Projects() {
    return (
        <section id="projects" className="section-space container-shell">
            <p className="section-label">Selected Work</p>
            <h2 className="section-heading">Projects</h2>
            <p className="section-description">
                A selection of applications I have built, from a marketplace to tools
                for workouts and developers.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="glass-card group flex h-full flex-col overflow-hidden rounded-[1.6rem] transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_22px_55px_rgba(70,151,220,0.13)]"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#172341]">
                            <Image
                                src={project.image}
                                alt={`${project.name} project preview`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                            <h3 className="text-xl font-bold leading-snug">
                                {project.name}
                            </h3>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">
                                {project.shortDescription}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map((technology) => (
                                    <span key={technology} className="tech-badge">
                                        {technology}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/projects/${project.id}`}
                                className="secondary-button mt-7 self-start"
                                aria-label={`View details for ${project.name}`}
                            >
                                View More / Details
                                <FiArrowUpRight aria-hidden="true" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}