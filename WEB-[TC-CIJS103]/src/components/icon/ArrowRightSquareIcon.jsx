
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { motion, useAnimation } from 'framer-motion'; // sửa đúng package

export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }



const defaultTransition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

const ArrowRightSquareIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 40, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    (e) => {
      if (!isControlledRef.current) {
        controls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <motion.path
          variants={{
            normal: { x: 0 },
            animate: { x: [0, 2, 0] },
          }}
          transition={defaultTransition}
          animate={controls}
          d="m10 8 4 4-4 4"
        />
      </svg>
    </div>
  );
});

ArrowRightSquareIcon.displayName = 'ArrowRightSquareIcon';

export { ArrowRightSquareIcon };
