import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouch = 'ontouchstart' in window;
    if (isTouch) return;

    setVisible(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener('mousemove', move, { passive: true });

    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white/80 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovering ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}