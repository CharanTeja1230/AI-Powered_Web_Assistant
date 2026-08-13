import React, { useEffect, useRef } from 'react';

interface SpaceWallpaperCanvasProps {
  theme?: 'dark' | 'light';
}

export const SpaceWallpaperCanvas: React.FC<SpaceWallpaperCanvasProps> = ({ theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars setup
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Astronaut setup
    let astronautAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        grad.addColorStop(0, '#06060c');
        grad.addColorStop(0.5, '#0d0b26');
        grad.addColorStop(1, '#241b4e');
      } else {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#f0f5ff');
        grad.addColorStop(1, '#f4edfe');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${Math.abs(star.alpha)})`
          : `rgba(168, 85, 247, ${Math.abs(star.alpha) * 0.6})`;
        ctx.fill();
      });

      // Floating Astronaut Silhouette
      astronautAngle += 0.01;
      const astroX = width * 0.18 + Math.sin(astronautAngle) * 15;
      const astroY = height * 0.35 + Math.cos(astronautAngle * 0.8) * 15;

      ctx.save();
      ctx.translate(astroX, astroY);
      ctx.rotate(Math.sin(astronautAngle * 0.5) * 0.08);

      // Helmet & Suit
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.88)' : 'rgba(76, 29, 149, 0.75)';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();

      // Visor Glow
      ctx.fillStyle = isDark ? '#00f3ff' : '#a855f7';
      ctx.beginPath();
      ctx.arc(4, -2, 7, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(76, 29, 149, 0.65)';
      ctx.beginPath();
      ctx.ellipse(0, 22, 14, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};
