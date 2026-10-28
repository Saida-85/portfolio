"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ---- Tweak these values to change speed and feel ----
const AUTO_SPIN_SPEED = 0.1; // slow drift (faster)
const SCROLL_SPIN_SPEED = 0.007; // spin per pixel scrolled (faster)
const SCROLL_TILT = 0.0005; // tilt added while scrolling
const SCROLL_FOLLOW_SPEED = 8; // how fast the scroll spin catches up

const HOVER_SPIN_Y = 2.2; // MUCH faster turn left/right with the mouse (was 1.1)
const HOVER_SPIN_X = 1; // faster tilt up/down with the mouse (was 0.5)
const HOVER_SHIFT_X = 1.8; // sideways slide
const HOVER_SHIFT_Y = 0.9; // up/down slide
const HOVER_FOLLOW_SPEED = 12; // hover reacts almost instantly (was 7)

const MOUSE_STRENGTH_X = 0.8; // camera parallax left/right
const MOUSE_STRENGTH_Y = 0.5; // camera parallax up/down
const FOLLOW_SPEED = 7; // how fast the camera follows the mouse
const FORCE_ANIMATION = true; // true = always animate, even if Windows "Animation effects" is off
// -----------------------------------------------------

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const reducedMotion = FORCE_ANIMATION ? false : prefersReducedMotion;
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

        // Raw mouse position (-1 to 1) and a smoothed copy used for hover movement
        const pointer = { x: 0, y: 0 };
        const smoothPointer = { x: 0, y: 0 };

        let frameId = 0;
        let elapsed = 0;
        let lastTime = 0;

        // Spin that comes from time (slow drift)
        let autoRotation = 0;

        // Spin that comes from scrolling (smoothed)
        let targetScrollRotation = window.scrollY * SCROLL_SPIN_SPEED;
        let scrollRotation = targetScrollRotation;

        let targetScrollTilt = window.scrollY * SCROLL_TILT;
        let scrollTilt = targetScrollTilt;

        const renderStatic = () => {
            particles.rotation.y = autoRotation + scrollRotation;
            particles.rotation.x = scrollTilt;
            renderer.render(scene, camera);
        };

        const onScroll = () => {
            targetScrollRotation = window.scrollY * SCROLL_SPIN_SPEED;
            targetScrollTilt = window.scrollY * SCROLL_TILT;

            if (reducedMotion) {
                scrollRotation = targetScrollRotation;
                scrollTilt = targetScrollTilt;
                renderStatic();
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;

            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        const onPointerLeave = () => {
            // Ease back to the center when the mouse leaves the window
            pointer.x = 0;
            pointer.y = 0;
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
                renderStatic();
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

            // Smoothly follow the scroll position
            const scrollFollow = 1 - Math.exp(-SCROLL_FOLLOW_SPEED * delta);
            scrollRotation +=
                (targetScrollRotation - scrollRotation) * scrollFollow;
            scrollTilt += (targetScrollTilt - scrollTilt) * scrollFollow;

            // Smoothly follow the mouse for the hover movement
            const hoverFollow = 1 - Math.exp(-HOVER_FOLLOW_SPEED * delta);
            smoothPointer.x += (pointer.x - smoothPointer.x) * hoverFollow;
            smoothPointer.y += (pointer.y - smoothPointer.y) * hoverFollow;

            // Slow drift so it never looks frozen
            autoRotation += delta * AUTO_SPIN_SPEED;

            // SPIN: drift + scroll + hover (mouse left/right turns it)
            particles.rotation.y =
                autoRotation + scrollRotation + smoothPointer.x * HOVER_SPIN_Y;
            particles.rotation.x =
                Math.sin(elapsed * 0.12) * 0.035 +
                scrollTilt +
                smoothPointer.y * HOVER_SPIN_X;

            // MOVE: the whole background slides with the mouse
            particles.position.x = smoothPointer.x * HOVER_SHIFT_X;
            particles.position.y =
                Math.sin(elapsed * 0.28) * 0.12 -
                smoothPointer.y * HOVER_SHIFT_Y;

            // Camera parallax for extra depth
            const targetX = touchDevice
                ? Math.sin(elapsed * 0.2) * 0.15
                : pointer.x * MOUSE_STRENGTH_X;

            const targetY = touchDevice
                ? Math.cos(elapsed * 0.15) * 0.1
                : -pointer.y * MOUSE_STRENGTH_Y;

            const follow = 1 - Math.exp(-FOLLOW_SPEED * delta);

            camera.position.x += (targetX - camera.position.x) * follow;
            camera.position.y += (targetY - camera.position.y) * follow;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });
        document.documentElement.addEventListener(
            "pointerleave",
            onPointerLeave,
        );

        if (reducedMotion) {
            renderStatic();
        } else {
            frameId = window.requestAnimationFrame(animate);
        }

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);
            document.documentElement.removeEventListener(
                "pointerleave",
                onPointerLeave,
            );

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