'use client';

import { useEffect, useRef } from 'react';

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match parent
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Placeholder render loop
        let animationFrameId: number;

        const render = () => {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw placeholder player
            ctx.fillStyle = '#3b82f6'; // Blue
            ctx.fillRect(50, canvas.height / 2 - 25, 50, 50);

            // Draw placeholder text
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Game Canvas Initialized', canvas.width / 2, canvas.height / 2);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full"
        />
    );
}
