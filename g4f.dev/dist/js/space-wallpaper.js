/**
 * LUMO Space Wallpaper Engine
 * High-Resolution Live Animated Space Theme (Dark Neon & Light Pastel)
 * Includes: Floating Astronaut, Earth & Gas Giant Planets, Satellite/UFO, Twinkling Stars & Comets
 */

(function () {
    'use strict';

    function initSpaceWallpaper() {
        if (document.getElementById('space-wallpaper-canvas')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'space-wallpaper-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '-2';
        canvas.style.pointerEvents = 'none';
        canvas.style.transition = 'opacity 0.8s ease';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width, height, isDark = true;

        function checkTheme() {
            const htmlTheme = document.documentElement.getAttribute('data-theme');
            const bodyWhite = document.body.classList.contains('white');
            const savedDark = localStorage.getItem('darkMode') !== 'false' && localStorage.getItem('lumo_liquid_theme') !== 'light';
            isDark = (htmlTheme === 'dark' || (!htmlTheme && !bodyWhite && savedDark));
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.width = window.innerWidth * dpr;
            height = canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        }

        window.addEventListener('resize', resize);
        resize();

        // 1. Scattered Twinkling Stars
        const numStars = 140;
        const stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random(),
                speed: 0.005 + Math.random() * 0.015,
                phase: Math.random() * Math.PI * 2
            });
        }

        // 2. Floating Astronaut State
        const astronaut = {
            x: window.innerWidth * 0.82,
            y: window.innerHeight * 0.28,
            vx: 0.12,
            vy: 0.08,
            angle: 0,
            vAngle: 0.002,
            floatTime: 0
        };

        // 3. Planets (Earth-like & Gas Giant)
        const planetEarth = {
            x: window.innerWidth * 0.12,
            y: window.innerHeight * 0.72,
            radius: 46
        };

        const planetGasGiant = {
            x: window.innerWidth * 0.88,
            y: window.innerHeight * 0.82,
            radius: 65,
            ringAngle: -0.35
        };

        // 4. Satellite / UFO
        const satellite = {
            x: -50,
            y: window.innerHeight * 0.18,
            speed: 0.45,
            floatY: 0
        };

        // 5. Shooting Comet Trails
        const comets = [];
        function spawnComet() {
            if (comets.length < 2 && Math.random() < 0.012) {
                comets.push({
                    x: Math.random() * window.innerWidth * 0.8,
                    y: Math.random() * window.innerHeight * 0.4,
                    length: 120 + Math.random() * 80,
                    speed: 8 + Math.random() * 6,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
                    opacity: 1
                });
            }
        }

        function drawBackground() {
            const displayW = window.innerWidth;
            const displayH = window.innerHeight;
            const grad = ctx.createLinearGradient(0, 0, displayW, displayH);

            if (isDark) {
                // Black -> Deep Indigo -> Violet
                grad.addColorStop(0, '#06060c');
                grad.addColorStop(0.35, '#0d0b26');
                grad.addColorStop(0.7, '#241b4e');
                grad.addColorStop(1, '#1b1b36');
            } else {
                // White -> Pale Blue -> Lavender
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.4, '#f0f5ff');
                grad.addColorStop(0.75, '#e8ebff');
                grad.addColorStop(1, '#f4edfe');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, displayW, displayH);
        }

        function drawStars() {
            stars.forEach(star => {
                star.phase += star.speed;
                const alpha = 0.2 + (Math.sin(star.phase) + 1) * 0.4;
                ctx.save();
                ctx.fillStyle = isDark
                    ? `rgba(255, 255, 255, ${alpha})`
                    : `rgba(147, 130, 220, ${alpha * 0.7})`;
                ctx.shadowBlur = isDark ? 6 : 2;
                ctx.shadowColor = isDark ? '#00f3ff' : '#c7d2fe';
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        function drawComets() {
            spawnComet();
            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += Math.cos(c.angle) * c.speed;
                c.y += Math.sin(c.angle) * c.speed;
                c.opacity -= 0.012;

                if (c.opacity <= 0 || c.x > window.innerWidth || c.y > window.innerHeight) {
                    comets.splice(i, 1);
                    continue;
                }

                const tailX = c.x - Math.cos(c.angle) * c.length;
                const tailY = c.y - Math.sin(c.angle) * c.length;

                const lineGrad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
                if (isDark) {
                    lineGrad.addColorStop(0, `rgba(0, 243, 255, ${c.opacity})`);
                    lineGrad.addColorStop(0.4, `rgba(255, 0, 127, ${c.opacity * 0.6})`);
                    lineGrad.addColorStop(1, 'rgba(0,0,0,0)');
                } else {
                    lineGrad.addColorStop(0, `rgba(168, 85, 247, ${c.opacity * 0.8})`);
                    lineGrad.addColorStop(0.5, `rgba(186, 230, 253, ${c.opacity * 0.5})`);
                    lineGrad.addColorStop(1, 'rgba(255,255,255,0)');
                }

                ctx.save();
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = lineGrad;
                ctx.shadowBlur = isDark ? 10 : 4;
                ctx.shadowColor = isDark ? '#00f3ff' : '#a855f7';
                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
                ctx.restore();
            }
        }

        function drawEarthPlanet() {
            ctx.save();
            ctx.translate(planetEarth.x, planetEarth.y);

            // Glow Aura
            const aura = ctx.createRadialGradient(0, 0, planetEarth.radius * 0.8, 0, 0, planetEarth.radius * 1.5);
            if (isDark) {
                aura.addColorStop(0, 'rgba(0, 243, 255, 0.25)');
                aura.addColorStop(1, 'rgba(0, 243, 255, 0)');
            } else {
                aura.addColorStop(0, 'rgba(186, 230, 253, 0.4)');
                aura.addColorStop(1, 'rgba(255, 255, 255, 0)');
            }
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, 0, planetEarth.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Planet Body
            const pGrad = ctx.createLinearGradient(-planetEarth.radius, -planetEarth.radius, planetEarth.radius, planetEarth.radius);
            if (isDark) {
                pGrad.addColorStop(0, '#1e3a8a');
                pGrad.addColorStop(0.5, '#0284c7');
                pGrad.addColorStop(1, '#090d16');
            } else {
                pGrad.addColorStop(0, '#bae6fd');
                pGrad.addColorStop(0.6, '#e0f2fe');
                pGrad.addColorStop(1, '#c7d2fe');
            }
            ctx.fillStyle = pGrad;
            ctx.beginPath();
            ctx.arc(0, 0, planetEarth.radius, 0, Math.PI * 2);
            ctx.fill();

            // Continent outlines
            ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(124, 58, 237, 0.35)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(-12, -10, 16, 0.2, Math.PI * 0.9);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(14, 12, 18, 2.5, Math.PI * 1.8);
            ctx.stroke();

            ctx.restore();
        }

        function drawGasGiant() {
            ctx.save();
            ctx.translate(planetGasGiant.x, planetGasGiant.y);

            // Ring (Behind)
            ctx.save();
            ctx.rotate(planetGasGiant.ringAngle);
            ctx.scale(2.2, 0.5);
            ctx.strokeStyle = isDark ? 'rgba(255, 0, 127, 0.5)' : 'rgba(199, 210, 254, 0.7)';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.arc(0, 0, planetGasGiant.radius * 0.9, 0, Math.PI);
            ctx.stroke();
            ctx.restore();

            // Planet Body
            const gGrad = ctx.createLinearGradient(-planetGasGiant.radius, -planetGasGiant.radius, planetGasGiant.radius, planetGasGiant.radius);
            if (isDark) {
                gGrad.addColorStop(0, '#7e22ce');
                gGrad.addColorStop(0.5, '#4c1d95');
                gGrad.addColorStop(1, '#110c24');
            } else {
                gGrad.addColorStop(0, '#f3e8ff');
                gGrad.addColorStop(0.6, '#e9d5ff');
                gGrad.addColorStop(1, '#ddd6fe');
            }
            ctx.fillStyle = gGrad;
            ctx.beginPath();
            ctx.arc(0, 0, planetGasGiant.radius, 0, Math.PI * 2);
            ctx.fill();

            // Ring (Front)
            ctx.save();
            ctx.rotate(planetGasGiant.ringAngle);
            ctx.scale(2.2, 0.5);
            ctx.strokeStyle = isDark ? 'rgba(0, 243, 255, 0.7)' : 'rgba(168, 85, 247, 0.6)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(0, 0, planetGasGiant.radius * 0.9, Math.PI, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }

        function drawSatellite() {
            satellite.x += satellite.speed;
            satellite.floatY = Math.sin(satellite.x * 0.015) * 8;
            if (satellite.x > window.innerWidth + 80) {
                satellite.x = -80;
                satellite.y = Math.random() * window.innerHeight * 0.35 + 50;
            }

            ctx.save();
            ctx.translate(satellite.x, satellite.y + satellite.floatY);
            ctx.rotate(0.2);

            const color = isDark ? '#00f3ff' : '#7c3aed';
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 1.8;

            // Satellite body & solar wings
            ctx.strokeRect(-8, -5, 16, 10);
            ctx.fillRect(-22, -3, 11, 6);
            ctx.fillRect(11, -3, 11, 6);

            // Antenna dish
            ctx.beginPath();
            ctx.arc(0, -9, 5, Math.PI, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -5);
            ctx.lineTo(0, -9);
            ctx.stroke();

            ctx.restore();
        }

        function drawAstronaut() {
            astronaut.floatTime += 0.015;
            astronaut.x += Math.cos(astronaut.floatTime * 0.5) * 0.35;
            astronaut.y += Math.sin(astronaut.floatTime) * 0.45;
            astronaut.angle = Math.sin(astronaut.floatTime * 0.3) * 0.09;

            ctx.save();
            ctx.translate(astronaut.x, astronaut.y);
            ctx.rotate(astronaut.angle);
            ctx.scale(0.95, 0.95);

            const primaryColor = isDark ? '#f8fafc' : '#4c1d95';
            const accentColor = isDark ? '#00f3ff' : '#a855f7';
            const magentaColor = isDark ? '#ff007f' : '#3b82f6';

            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 2.4;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            // 1. Oxygen Life Support Backpack with thruster lights
            ctx.fillStyle = isDark ? 'rgba(30, 27, 75, 0.8)' : 'rgba(237, 233, 254, 0.8)';
            ctx.beginPath();
            ctx.roundRect(-26, -22, 16, 42, 6);
            ctx.fill();
            ctx.stroke();

            // Thruster LEDs
            ctx.fillStyle = magentaColor;
            ctx.beginPath();
            ctx.arc(-22, -15, 2, 0, Math.PI * 2);
            ctx.arc(-22, 15, 2, 0, Math.PI * 2);
            ctx.fill();

            // 2. Floating Life Line / Tether Cable
            ctx.strokeStyle = isDark ? 'rgba(0, 243, 255, 0.4)' : 'rgba(168, 85, 247, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-26, 0);
            ctx.bezierCurveTo(-50, -10, -70, 20, -95, 5);
            ctx.stroke();
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 2.4;

            // 3. Helmet & Visor Shell
            ctx.fillStyle = isDark ? '#090d16' : '#ffffff';
            ctx.beginPath();
            ctx.arc(0, -16, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Helmet Outer Shadow Ring
            ctx.strokeStyle = isDark ? 'rgba(0, 243, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)';
            ctx.beginPath();
            ctx.arc(0, -16, 21, -0.5, Math.PI * 0.8);
            ctx.stroke();
            ctx.strokeStyle = primaryColor;

            // Dual-Layer Visor Reflection
            ctx.save();
            const visorGrad = ctx.createLinearGradient(-10, -22, 12, -10);
            if (isDark) {
                visorGrad.addColorStop(0, '#00f3ff');
                visorGrad.addColorStop(0.5, '#a855f7');
                visorGrad.addColorStop(1, '#ff007f');
            } else {
                visorGrad.addColorStop(0, '#c7d2fe');
                visorGrad.addColorStop(0.6, '#a855f7');
                visorGrad.addColorStop(1, '#7c3aed');
            }
            ctx.fillStyle = visorGrad;
            ctx.shadowBlur = isDark ? 14 : 4;
            ctx.shadowColor = accentColor;
            ctx.beginPath();
            ctx.ellipse(3, -16, 11, 7.5, 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Visor Glass Specular Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.ellipse(-1, -19, 3.5, 1.8, -0.4, 0, Math.PI * 2);
            ctx.fill();

            // 4. Suit Torso / Chest Armor
            ctx.fillStyle = isDark ? '#0f172a' : '#f8fafc';
            ctx.beginPath();
            ctx.roundRect(-14, 2, 28, 30, 8);
            ctx.fill();
            ctx.stroke();

            // Chest Telemetry Display Panel
            ctx.fillStyle = isDark ? 'rgba(0, 243, 255, 0.15)' : 'rgba(168, 85, 247, 0.15)';
            ctx.fillRect(-8, 8, 16, 12);
            ctx.strokeRect(-8, 8, 16, 12);

            // Status Indicator Lights
            ctx.fillStyle = isDark ? '#00f3ff' : '#7c3aed';
            ctx.fillRect(-5, 11, 4, 3);
            ctx.fillStyle = magentaColor;
            ctx.fillRect(1, 11, 4, 3);

            // Shoulder Badges
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(-14, 6, 3, 0, Math.PI * 2);
            ctx.arc(14, 6, 3, 0, Math.PI * 2);
            ctx.fill();

            // 5. Left Arm (Floating back)
            ctx.beginPath();
            ctx.moveTo(-14, 8);
            ctx.lineTo(-28, 18);
            ctx.lineTo(-24, 28);
            ctx.stroke();
            // Glove
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(-24, 29, 3.5, 0, Math.PI * 2);
            ctx.fill();

            // 6. Right Arm (Reaching forward towards stars)
            ctx.beginPath();
            ctx.moveTo(14, 8);
            ctx.lineTo(28, -1);
            ctx.lineTo(38, 7);
            ctx.stroke();
            // Glove
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(39, 8, 3.5, 0, Math.PI * 2);
            ctx.fill();

            // 7. Boots & Legs
            ctx.beginPath();
            ctx.moveTo(-8, 32);
            ctx.lineTo(-15, 50);
            ctx.lineTo(-22, 55);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(8, 32);
            ctx.lineTo(14, 48);
            ctx.lineTo(20, 55);
            ctx.stroke();

            // Boot Soles
            ctx.fillStyle = isDark ? '#334155' : '#c7d2fe';
            ctx.fillRect(-24, 53, 7, 3);
            ctx.fillRect(18, 53, 7, 3);

            ctx.restore();
        }

        function render() {
            checkTheme();
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            drawBackground();
            drawStars();
            drawEarthPlanet();
            drawGasGiant();
            drawSatellite();
            drawAstronaut();
            drawComets();
            requestAnimationFrame(render);
        }

        render();

        // Theme MutationObserver
        const observer = new MutationObserver(() => checkTheme());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpaceWallpaper);
    } else {
        initSpaceWallpaper();
    }
})();
