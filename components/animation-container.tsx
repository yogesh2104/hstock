"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

interface AnimationContainerProps {
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    className?: string;
};

const AnimationContainer = ({ children, className, reverse, delay }: AnimationContainerProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.2, delay: delay, ease: 'easeInOut', type: 'spring', stiffness: 260, damping: 20 }}
        >
            {children}
        </motion.div>
    )
};

export default AnimationContainer

export const FullWidthWrapper = ({ className, children }: Props) => {
    return (
        <section className={cn(
            "h-full mx-auto w-full max-w-full md:max-w-screen-xl px-4 md:px-12 lg:px-20",
            className,
        )}>
            {children}
        </section>
    )
};
