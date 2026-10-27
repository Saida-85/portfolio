"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
    SiCss,
    SiHtml5,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import * as THREE from "three";

type Skill = {
    name: string;
    icon: IconType | null;
    color: string;
};

const skills: Skill[] = [
    { name: "HTML", icon: SiHtml5, color: "#f19a6a" },
    { name: "CSS", icon: SiCss, color: "#75b9ff" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#67e8f9" },
    { name: "Node.js", icon: SiNodedotjs, color: "#94d985" },
    { name: "TypeScript", icon: SiTypescript, color: "#84b7ff" },
    { name: "React", icon: SiReact, color: "#82e8ff" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "BetterAuth", icon: null, color: "#cca9ff" },
    { name: "MongoDB", icon: SiMongodb, color: "#80d79a" },
];

function createSpherePoints(count: number, radius: number): Float32Array {
    const positions = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ringRadius = Math.sqrt(1 - y * y);
        const angle = goldenAngle * i;
        const index = i * 3;

        positions[index] = Math.cos(angle) * ringRadius * radius;
        positions[index + 1] = y * radius;
        positions[index + 2] = Math.sin(angle) * ringRadius * radius;
    }

    return positions;
}

export default function SkillsGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: "low-power",
            });
        } catch {
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);

        const canvas = renderer.domElement;
        canvas.className = "skills-globe-canvas";
        container.prepend(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 5.7);
        camera.lookAt(0, 0, 0);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const innerGeometry = new THREE.SphereGeometry(0.99, 48, 32);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: "#101635",
            transparent: true,
            opacity: 0.88,
        });
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        globeGroup.add(innerSphere);

        const wireGeometry = new THREE.SphereGeometry(1, 24, 16);
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: "#8ba9ff",
            transparent: true,
            opacity: 0.27,
            wireframe: true,
            depthWrite: false,
        });
        const wireSphere = new THREE.Mesh(wireGeometry, wireMaterial);
        globeGroup.add(wireSphere);

        const dotsGeometry = new THREE.BufferGeometry();
        dotsGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(createSpherePoints(850, 1.015), 3),
        );
        const dotsMaterial = new THREE.PointsMaterial({
            color: "#7be7f1",
            size: 0.017,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.82,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const dots = new THREE.Points(dotsGeometry, dotsMaterial);
        globeGroup.add(dots);

        const glowGeometry = new THREE.SphereGeometry(1.12, 32, 24);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: "#7868e9",
            transparent: true,
            opacity: 0.055,
            depthWrite: false,
            side: THREE.BackSide,
        });
        const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
        globeGroup.add(glowSphere);

        const orbitGeometry = new THREE.RingGeometry(1.63, 1.637, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: "#8f91ef",
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
            depthWrite: false,
        });

        const rings = [
            new THREE.Mesh(orbitGeometry, orbitMaterial),
            new THREE.Mesh(orbitGeometry, orbitMaterial),
        ];

        rings[0].rotation.set(0.4, 0.25, 0.45);
        rings[1].rotation.set(-0.5, 0.7, -0.35);
        rings.forEach((ring) => globeGroup.add(ring));

        // Three tilted orbital paths distribute the nine badges in 3D.
        const orbitPositions = skills.map((_, index) => {
            const ring = Math.floor(index / 3);
            const positionOnRing = index % 3;
            const angle = (positionOnRing / 3) * Math.PI * 2 + ring * 0.38;
            const radius = 1.62;

            const point = new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0,
            );

            const tilt = [
                new THREE.Euler(0.45, 0.15, 0.35),
                new THREE.Euler(-0.4, 0.7, -0.5),
                new THREE.Euler(0.7, -0.55, 0.2),
            ][ring];

            return point.applyEuler(tilt);
        });

        const projected = new THREE.Vector3();
        const rotation = new THREE.Euler();

        let width = 0;
        let height = 0;
        let frameId = 0;
        let lastTime = 0;
        let visible = true;
        let hovering = false;
        let dragging = false;
        let activePointerId: number | null = null;
        let previousX = 0;
        let previousY = 0;
        let targetRotationX = -0.16;
        let targetRotationY = 0;
        let currentRotationX = -0.16;
        let currentRotationY = 0;

        const render = () => {
            currentRotationX += (targetRotationX - currentRotationX) * 0.1;
            currentRotationY += (targetRotationY - currentRotationY) * 0.1;

            globeGroup.rotation.x = currentRotationX;
            globeGroup.rotation.y = currentRotationY;
            rotation.set(currentRotationX, currentRotationY, 0);

            orbitPositions.forEach((position, index) => {
                const badge = badgeRefs.current[index];
                if (!badge) return;

                projected.copy(position).applyEuler(rotation);
                const depth = projected.z;

                projected.project(camera);

                const screenX = (projected.x * 0.5 + 0.5) * width;
                const screenY = (-projected.y * 0.5 + 0.5) * height;

                const depthRatio = THREE.MathUtils.clamp(
                    (depth + 1.7) / 3.4,
                    0,
                    1,
                );
                const scale = 0.72 + depthRatio * 0.45;
                const opacity = 0.5 + depthRatio * 0.5;

                badge.style.transform = `translate(-50%, -50%) translate(${screenX}px, ${screenY}px) scale(${scale})`;
                badge.style.opacity = String(opacity);
                badge.style.zIndex = String(Math.round(depthRatio * 10) + 2);
            });

            renderer.render(scene, camera);
        };

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;

            if (!width || !height) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(width, height, false);
            render();
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        resize();

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible && reducedMotion) render();
            },
            { threshold: 0.05 },
        );
        intersectionObserver.observe(container);

        const onVisibilityChange = () => {
            lastTime = 0;
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        const onPointerDown = (event: PointerEvent) => {
            // Keep normal vertical scrolling available on touch screens.
            dragging = true;
            activePointerId = event.pointerId;
            previousX = event.clientX;
            previousY = event.clientY;

            if (event.pointerType === "mouse") {
                container.setPointerCapture(event.pointerId);
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            if (!dragging || activePointerId !== event.pointerId) return;

            const dx = event.clientX - previousX;
            const dy = event.clientY - previousY;

            targetRotationY += dx * 0.008;
            targetRotationX = THREE.MathUtils.clamp(
                targetRotationX + dy * 0.006,
                -0.75,
                0.75,
            );

            previousX = event.clientX;
            previousY = event.clientY;

            if (reducedMotion) render();
        };

        const onPointerEnd = (event: PointerEvent) => {
            if (activePointerId !== event.pointerId) return;

            dragging = false;
            activePointerId = null;

            if (container.hasPointerCapture(event.pointerId)) {
                container.releasePointerCapture(event.pointerId);
            }
        };

        const onPointerEnter = () => {
            hovering = true;
        };

        const onPointerLeave = () => {
            hovering = false;
        };

        container.addEventListener("pointerdown", onPointerDown);
        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerup", onPointerEnd);
        container.addEventListener("pointercancel", onPointerEnd);
        container.addEventListener("pointerenter", onPointerEnter);
        container.addEventListener("pointerleave", onPointerLeave);

        const animate = (time: number) => {
            frameId = window.requestAnimationFrame(animate);

            if (!visible || document.hidden) {
                lastTime = 0;
                return;
            }

            const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
            lastTime = time;

            if (!dragging) {
                targetRotationY += delta * (hovering ? 0.07 : 0.24);
            }

            render();
        };

        if (!reducedMotion) {
            frameId = window.requestAnimationFrame(animate);
        } else {
            render();
        }

        return () => {
            window.cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();

            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange,
            );

            container.removeEventListener("pointerdown", onPointerDown);
            container.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerup", onPointerEnd);
            container.removeEventListener("pointercancel", onPointerEnd);
            container.removeEventListener("pointerenter", onPointerEnter);
            container.removeEventListener("pointerleave", onPointerLeave);

            globeGroup.remove(
                innerSphere,
                wireSphere,
                dots,
                glowSphere,
                ...rings,
            );
            scene.remove(globeGroup);

            innerGeometry.dispose();
            innerMaterial.dispose();
            wireGeometry.dispose();
            wireMaterial.dispose();
            dotsGeometry.dispose();
            dotsMaterial.dispose();
            glowGeometry.dispose();
            glowMaterial.dispose();
            orbitGeometry.dispose();
            orbitMaterial.dispose();

            renderer.dispose();
            canvas.remove();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="skills-globe"
            aria-label="Interactive 3D globe showing web development skills"
        >
            {skills.map(({ name, icon: Icon, color }, index) => (
                <div
                    key={name}
                    ref={(element) => {
                        badgeRefs.current[index] = element;
                    }}
                    className="skills-globe-badge"
                    style={{ color }}
                    tabIndex={0}
                    role="img"
                    aria-label={name}
                    title={name}
                >
                    {Icon ? (
                        <Icon aria-hidden="true" />
                    ) : (
                        <span aria-hidden="true" className="text-sm font-black">
                            BA
                        </span>
                    )}
                    <span className="skills-globe-tooltip" aria-hidden="true">
                        {name}
                    </span>
                </div>
            ))}
        </div>
    );
}