"use client";

import { useEffect, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  active: boolean;
  pressed: boolean;
};

const INITIAL_STATE: CursorState = {
  x: 0,
  y: 0,
  visible: false,
  active: false,
  pressed: false,
};

export function CustomCursor() {
  const [state, setState] = useState<CursorState>(INITIAL_STATE);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let raf = 0;
    let nextX = 0;
    let nextY = 0;

    const interactiveSelector =
      'a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]';

    const updatePosition = () => {
      raf = 0;
      setState((current) => ({
        ...current,
        x: nextX,
        y: nextY,
        visible: true,
      }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;

      if (!raf) {
        raf = window.requestAnimationFrame(updatePosition);
      }

      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(target?.closest(interactiveSelector));

      setState((current) =>
        current.active === isInteractive ? current : { ...current, active: isInteractive }
      );
    };

    const handlePointerDown = () => {
      setState((current) => ({ ...current, pressed: true }));
    };

    const handlePointerUp = () => {
      setState((current) => ({ ...current, pressed: false }));
    };

    const handlePointerLeave = () => {
      setState((current) => ({ ...current, visible: false, active: false, pressed: false }));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);

      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  const hidden = !state.visible;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
    >
      <div
        className="fixed h-14 w-14 rounded-full border border-cyan-300/40 bg-cyan-300/10 backdrop-blur-md transition-[transform,opacity,border-color,background-color] duration-150 ease-out"
        style={{
          opacity: hidden ? 0 : 1,
          transform: `translate3d(${state.x - 28}px, ${state.y - 28}px, 0) scale(${
            state.active ? 1.35 : state.pressed ? 0.85 : 1
          })`,
          borderColor: state.active ? "rgba(125, 211, 252, 0.7)" : "rgba(125, 211, 252, 0.35)",
          backgroundColor: state.active
            ? "rgba(34, 211, 238, 0.18)"
            : "rgba(34, 211, 238, 0.08)",
        }}
      />
      <div
        className="fixed h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.55)] transition-[transform,opacity,background-color] duration-150 ease-out"
        style={{
          opacity: hidden ? 0 : 1,
          transform: `translate3d(${state.x - 5}px, ${state.y - 5}px, 0) scale(${
            state.active ? 0.7 : state.pressed ? 1.3 : 1
          })`,
          backgroundColor: state.active ? "#fff7ed" : "#a5f3fc",
        }}
      />
    </div>
  );
}
