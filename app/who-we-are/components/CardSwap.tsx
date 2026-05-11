"use client"

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from "react";
import gsap from "gsap";

/* ================= PROPS ================= */

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

/* ================= CARD ================= */

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`
        absolute top-1/2 left-1/2
        rounded-2xl border border-white/15
        bg-gradient-to-br from-[#0a1f33]/90 to-[#020b16]/90
        backdrop-blur-xl
        shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]
        text-white
        transition-all duration-300
        hover:shadow-[0_50px_120px_-20px_rgba(56,189,248,0.35)]
        hover:-translate-y-1
        [transform-style:preserve-3d]
        [will-change:transform]
        [backface-visibility:hidden]
        ${customClass ?? ""}
        ${rest.className ?? ""}
      `}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

/* ================= INTERNAL TYPES ================= */

type CardRef = RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

/* ================= HELPERS ================= */

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true
  });

/* ================= MAIN COMPONENT ================= */

const CardSwap: React.FC<CardSwapProps> = ({
  width = 520,
  height = 360,
  cardDistance = 100,
  verticalDistance = 200,
  delay = 1000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );

  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);

        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, "return");

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="
        absolute bottom-0 right-0
        translate-x-[5%] translate-y-[20%]
        origin-bottom-right
        perspective-[900px]
        overflow-visible
        max-[768px]:scale-[0.75]
        max-[480px]:scale-[0.55]
      "
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;

/* ================= EXAMPLE CARD CONTENT ================= */


// <Card>
//   <div className="flex h-full flex-col justify-between p-8">
//     <div>
//       <span className="text-sm uppercase tracking-widest text-sky-300">
//         Our Purpose
//       </span>
//       <h3 className="mt-3 text-2xl font-semibold leading-tight">
//         Building Trust Through Technology
//       </h3>
//       <p className="mt-4 text-base leading-relaxed text-white/80">
//         BTL exists to simplify complexity and create meaningful impact through
//         technology. Every solution is designed to be practical, resilient,
//         and scalable so that our customers can operate with confidence in
//         high-stakes environments.
//       </p>
//     </div>

//     <p className="mt-6 text-sm text-white/60">
//       We measure success not only in deployments completed, but in risks
//       reduced, time saved, and trust earned with every engagement.
//     </p>
//   </div>
// </Card>

