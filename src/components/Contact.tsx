import {
    FiMail,
    FiMessageCircle,
    FiPhone,
} from "react-icons/fi";

const contacts = [
    {
        label: "Email",
        value: "saidanosratorfa2000@gmail.com",
        href: "mailto:saidanosratorfa2000@gmail.com",
        icon: FiMail,
        external: false,
    },
    {
        label: "Phone",
        value: "+8801879473659",
        href: "tel:+8801879473659",
        icon: FiPhone,
        external: false,
    },
    {
        label: "WhatsApp",
        value: "+8801879473659",
        href: "https://wa.me/8801879473659",
        icon: FiMessageCircle,
        external: true,
    },
] as const;

export default function Contact() {
    return (
        <section id="contact" className="section-space container-shell">
            <div className="text-center">
                <p className="section-label">Let&apos;s Connect</p>
                <h2 className="section-heading">Contact Me</h2>
                <p className="section-description mx-auto">
                    Have a project in mind or want to say hello? I&apos;d love to hear
                    from you.
                </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {contacts.map(({ label, value, href, icon: Icon, external }) => (
                    <a
                        key={label}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 sm:p-7"
                        aria-label={`${label}: ${value}`}
                    >
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-400/15 text-xl text-cyan-300 transition-colors group-hover:bg-cyan-300/15">
                            <Icon aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 font-bold">{label}</h3>
                        <p className="mt-2 break-all text-sm text-slate-300">
                            {value}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
}