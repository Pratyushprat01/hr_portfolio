import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas  = canvasRef.current!;
    const wrapper = wrapperRef.current!;
    const ctx     = canvas.getContext("2d")!;

    let width  = wrapper.clientWidth;
    let height = wrapper.clientHeight;
    canvas.width  = width;
    canvas.height = height;

    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
    }[] = [];

    for (let i = 0; i < 110; i++) {
      particles.push({
        x:    Math.random() * width,
        y:    Math.random() * height,
        vx:   (Math.random() - 0.5) * 0.35,
        vy:   (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.5,
      });
    }

    let rafId: number;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      /* particles */
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)      p.x = width;
        if (p.x > width)  p.x = 0;
        if (p.y < 0)      p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120,180,255,0.9)";
        ctx.fill();
      });

      /* connection lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120,180,255,${0.5 - dist / 220})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    /* resize: watch the wrapper, not the window */
    const ro = new ResizeObserver(() => {
      width  = wrapper.clientWidth;
      height = wrapper.clientHeight;
      canvas.width  = width;
      canvas.height = height;
    });
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    /*
      THIS div must be position:absolute + inset:0 so it fills
      .orbit-wrapper exactly. overflow:hidden on .orbit-wrapper
      will then clip everything to the wrapper's bounds.
    */
    <div
      ref={wrapperRef}
      className="bg-canvas-wrapper"   /* see orbital.css */
    >
      <canvas ref={canvasRef} />
    </div>
  );
}