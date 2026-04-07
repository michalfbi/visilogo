export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const easing = [0.22, 1, 0.36, 1];

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const heroStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
};

export const revealLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

export const revealRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easing,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(14px)', y: 24 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.95,
      ease: easing,
    },
  },
};

export const liftOnHover = {
  y: -8,
  scale: 1.01,
  transition: {
    duration: 0.35,
    ease: easing,
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  hover: {
    y: -10,
    scale: 1.015,
    rotateX: -2,
    rotateY: 2,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
};

export const menuReveal = {
  hidden: {
    opacity: 0,
    y: -18,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export const mobilePanel = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easing,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

export const navItemReveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easing,
    },
  },
};

export const sectionViewport = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -10% 0px',
};

export const springSoft = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export const springCard = {
  type: 'spring',
  stiffness: 160,
  damping: 18,
  mass: 0.7,
};

export const glowPulse = {
  initial: { opacity: 0.45, scale: 0.92 },
  animate: {
    opacity: [0.42, 0.72, 0.42],
    scale: [0.94, 1.05, 0.94],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatingOrbs = {
  animate: {
    y: [0, -18, 0, 14, 0],
    x: [0, 12, -10, 8, 0],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const shimmerLine = {
  initial: { backgroundPosition: '200% 0%' },
  animate: {
    backgroundPosition: ['200% 0%', '-200% 0%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
