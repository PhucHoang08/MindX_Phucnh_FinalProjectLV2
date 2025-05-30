
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react';
import { motion, useAnimation } from 'framer-motion'; // sửa lại từ 'motion/react' về 'framer-motion'

export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  

const UpvoteIconCard = forwardRef(({
  onMouseEnter,
  onMouseLeave,
  className,
  size = 25,
  ...props
}, ref) => {
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          normal: {
            translateX: '0px',
            translateY: '0px',
            rotate: '0deg',
          },
          animate: {
            translateX: '-1px',
            translateY: '-2px',
            rotate: '-12deg',
          },
        }}
        animate={controls}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </motion.svg>
    </div>
  );
});

UpvoteIconCard.displayName = 'UpvoteIconCard';

export { UpvoteIconCard };
