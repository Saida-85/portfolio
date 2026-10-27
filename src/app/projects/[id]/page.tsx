import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectById, projects } from "@/data/projects";

type ProjectPageProps = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        return { title: "Project Not Found | Saida Nosrat Orfa" };
    }

    return {
        title: `${project.name} | Saida Nosrat Orfa`,
        description: project.description,
    };
}

async function ProjectDetails({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) notFound();

    return (
        <article className="mt-9">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#172341] shadow-2xl sm:rounded-[2rem]">
                <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    fill
                    priority
                    sizes="(max-width: 1180px) 100vw, 1180px"
                    className="object-cover"
                />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
                <div className="min-w-0">
                    <p className="section-label">Project Details</p>
                    <h1 className="section-heading wrap-break-word">
                        {project.name}
                    </h1>

                    <p className="mt-6 text-base leading-8 text-slate-300">
                        {project.description}
                    </p>

                    <section aria-labelledby="features-title" className="mt-12">
                        <h2
                            id="features-title"
                            className="text-2xl font-bold"
                        >
                            Key Features
                        </h2>

                        <div className="mt-5 grid gap-4">
                            {project.features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="glass-card rounded-2xl p-5 sm:p-6"
                                >
                                    <h3 className="font-bold text-cyan-200">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 leading-7 text-slate-300">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section
                        aria-labelledby="challenges-title"
                        className="mt-12"
                    >
                        <h2
                            id="challenges-title"
                            className="text-2xl font-bold"
                        >
                            Challenges Faced
                        </h2>

                        <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-300 marker:text-cyan-300">
                            {project.challenges.map((challenge) => (
                                <li key={challenge}>{challenge}</li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="future-title" className="mt-12">
                        <h2 id="future-title" className="text-2xl font-bold">
                            Potential Improvements / Future Plans
                        </h2>

                        <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-300 marker:text-violet-300">
                            {project.futurePlans.map((plan) => (
                                <li key={plan}>{plan}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                <aside className="lg:self-start">
                    <div className="glass-card rounded-2xl p-6 lg:sticky lg:top-24">
                        <h2 className="text-lg font-bold">
                            Technology Stack
                        </h2>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {project.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="tech-badge"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>

                        <div className="mt-7 grid gap-3">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="primary-button"
                            >
                                Live Project
                                <FiArrowUpRight aria-hidden="true" />
                            </a>

                            <a
                                href={project.repositoryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="secondary-button"
                            >
                                <FiGithub aria-hidden="true" />
                                GitHub Repository
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
}

function ProjectDetailsFallback() {
    return (
        <div
            className="glass-card mt-9 animate-pulse rounded-[1.7rem] p-5 sm:p-8"
            aria-label="Loading project details"
        >
            <div className="aspect-[16/9] rounded-2xl bg-white/5" />
            <div className="mt-8 h-10 w-2/3 rounded-lg bg-white/5" />
            <div className="mt-5 h-4 w-full rounded bg-white/5" />
            <div className="mt-3 h-4 w-3/4 rounded bg-white/5" />
        </div>
    );
}

export default function ProjectDetailsPage({
    params,
}: ProjectPageProps) {
    return (
        <>
            <Navbar />

            <main className="container-shell py-12 sm:py-16">
                <Link href="/#projects" className="secondary-button">
                    <FiArrowLeft aria-hidden="true" />
                    Back to Projects
                </Link>

                <Suspense fallback={<ProjectDetailsFallback />}>
                    <ProjectDetails params={params} />
                </Suspense>
            </main>

            <Footer />
        </>
    );
}