"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ---- Tweak these values to change speed and feel ----
const ROTATION_SPEED = 0.05; // spin speed (0.03 gentle, 0.05 normal, 0.1 fast)
const MOUSE_STRENGTH_X = 0.6; // how far the camera moves left/right with the mouse
const MOUSE_STRENGTH_Y = 0.4; // how far the camera moves up/down with the mouse
const FOLLOW_SPEED = 5; // how fast the camera follows the mouse (higher = snappier)
// -----------------------------------------------------

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        // Checked once here, not on every frame.
        const touchDevice = window.matchMedia("(pointer: coarse)").matches;

        const isMobile = window.innerWidth < 768;
        const particleCount = reducedMotion ? 350 : isMobile ? 700 : 1500;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: false,
                powerPreference: "high-performance",
            });
        } catch {
            // The CSS background remains visible if WebGL is unavailable.
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            100,
        );
        camera.position.z = 12;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const palette = [
            new THREE.Color("#a78bfa"),
            new THREE.Color("#67e8f9"),
            new THREE.Color("#f3e8ff"),
            new THREE.Color("#f5a9d0"),
        ];

        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            positions[index] = (Math.random() - 0.5) * 28;
            positions[index + 1] = (Math.random() - 0.5) * 18;
            positions[index + 2] = (Math.random() - 0.5) * 18;

            const color = palette[Math.floor(Math.random() * palette.length)];

            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: isMobile ? 0.055 : 0.045,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const pointer = { x: 0, y: 0 };

        let frameId = 0;
        let elapsed = 0;
        let lastTime = 0;

        const onPointerMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;

            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        const onResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio || 1, 1.5),
            );
            renderer.setSize(width, height);

            if (reducedMotion) {
                renderer.render(scene, camera);
            }
        };

        const animate = (time: number) => {
            frameId = window.requestAnimationFrame(animate);

            if (document.hidden) {
                lastTime = time;
                return;
            }

            const delta = lastTime
                ? Math.min((time - lastTime) / 1000, 0.05)
                : 0;

            lastTime = time;
            elapsed += delta;

            particles.rotation.y += delta * ROTATION_SPEED;
            particles.rotation.x = Math.sin(elapsed * 0.12) * 0.035;
            particles.position.y = Math.sin(elapsed * 0.28) * 0.12;

            const targetX = touchDevice
                ? Math.sin(elapsed * 0.2) * 0.15
                : pointer.x * MOUSE_STRENGTH_X;

            const targetY = touchDevice
                ? Math.cos(elapsed * 0.15) * 0.1
                : -pointer.y * MOUSE_STRENGTH_Y;

            // Frame-rate independent easing: same feel on 60Hz and 120Hz screens.
            const follow = 1 - Math.exp(-FOLLOW_SPEED * delta);

            camera.position.x += (targetX - camera.position.x) * follow;
            camera.position.y += (targetY - camera.position.y) * follow;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });

        if (reducedMotion) {
            renderer.render(scene, camera);
        } else {
            frameId = window.requestAnimationFrame(animate);
        }

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);

            scene.remove(particles);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="particle-background"
            aria-hidden="true"
        />
    );
}