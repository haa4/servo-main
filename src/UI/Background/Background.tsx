"use client";

import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import { SpacingToken } from "@/components/types";
import { Flex } from "@/UI";
import { DisplayProps } from "@/components/interfaces";
import styles from "@/scss/Background.module.scss";
import classNames from "classnames";

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
    }
}

interface MaskProps {
    cursor?: boolean;
    x?: number;
    y?: number;
    radius?: number;
}

interface GradientProps {
    display?: boolean;
    opacity?: DisplayProps["opacity"];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    tilt?: number;
    direction?: string;
    colors?: string[];
    ratios?: number[];
}

interface DotsProps {
    display?: boolean;
    opacity?: DisplayProps["opacity"];
    color?: string;
    size?: SpacingToken;
    revealOnHover?: boolean;
}

interface GridProps {
    display?: boolean;
    opacity?: DisplayProps["opacity"];
    color?: string;
    width?: string;
    height?: string;
}

interface LinesProps {
    display?: boolean;
    opacity?: DisplayProps["opacity"];
    size?: SpacingToken;
}

interface BackgroundProps extends React.ComponentProps<typeof Flex> {
    position?: CSSProperties["position"];
    gradient?: GradientProps;
    dots?: DotsProps;
    grid?: GridProps;
    lines?: LinesProps;
    mask?: MaskProps;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>(
    (
        {
            position = "fixed",
            gradient = {},
            dots = {},
            grid = {},
            lines = {},
            mask = {},
            children,
            className,
            style,
            ...rest
        },
        forwardedRef,
    ) => {
        const dotsColor = dots.color ?? "brand-on-background-weak";
        const dotsSize = "var(--static-space-" + (dots.size ?? "24") + ")";

        const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
        const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
        const [isHovering, setIsHovering] = useState(false);
        const backgroundRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setRef(forwardedRef, backgroundRef.current);
        }, [forwardedRef]);

        useEffect(() => {
            const handleMouseMove = (event: MouseEvent) => {
                if (backgroundRef.current) {
                    const rect = backgroundRef.current.getBoundingClientRect();
                    setCursorPosition({
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                    });
                    setIsHovering(true);
                }
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseleave", handleMouseLeave);
            };
        }, []);

        useEffect(() => {
            let animationFrameId: number;

            const updateSmoothPosition = () => {
                setSmoothPosition((prev) => {
                    const dx = cursorPosition.x - prev.x;
                    const dy = cursorPosition.y - prev.y;
                    const easingFactor = 0.05; // Adjust for smoother or more responsive tracking

                    return {
                        x: Math.round(prev.x + dx * easingFactor),
                        y: Math.round(prev.y + dy * easingFactor),
                    };
                });
                animationFrameId = requestAnimationFrame(updateSmoothPosition);
            };

            if (mask.cursor) {
                animationFrameId = requestAnimationFrame(updateSmoothPosition);
            }

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }, [cursorPosition, mask]);

        const maskStyle = (): CSSProperties => {
            if (!mask) return {};

            if (mask.cursor) {
                return {
                    "--mask-position-x": `${smoothPosition.x}px`,
                    "--mask-position-y": `${smoothPosition.y}px`,
                    "--mask-radius": `${mask.radius || 50}vh`,
                } as CSSProperties;
            }

            if (mask.x != null && mask.y != null) {
                return {
                    "--mask-position-x": `${mask.x}%`,
                    "--mask-position-y": `${mask.y}%`,
                    "--mask-radius": `${mask.radius || 50}vh`,
                } as CSSProperties;
            }

            return {};
        };

        const remap = (
            value: number,
            inputMin: number,
            inputMax: number,
            outputMin: number,
            outputMax: number,
        ) => {
            return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
        };

        const adjustedX = gradient.x != null ? remap(gradient.x, 0, 100, 37.5, 62.5) : 50;
        const adjustedY = gradient.y != null ? remap(gradient.y, 0, 100, 37.5, 62.5) : 50;

        // Format the gradient colors and ratios into a CSS compatible string
        const formatGradientColorStops = () => {
            if (!gradient.colors || gradient.colors.length === 0) {
                return undefined;
            }

            return gradient.colors.map((color, index) => {
                const ratio = gradient.ratios && gradient.ratios[index] !== undefined
                    ? `${gradient.ratios[index] * 100}%`
                    : `${(index / (gradient.colors.length - 1)) * 100}%`;
                return `${color} ${ratio}`;
            }).join(', ');
        };

        // Determine gradient direction
        const getGradientDirection = () => {
            const direction = gradient.direction || 'to bottom';
            return direction === 'top-to-bottom' ? 'to bottom' : direction;
        };

        return (
            <Flex
                ref={backgroundRef}
                fill
                position={position}
                className={classNames(mask && styles.mask, className)}
                top="0"
                left="0"
                zIndex={0}
                overflow="hidden"
                style={{
                    ...maskStyle(),
                    ...style,
                }}
                {...rest}
            >
                {gradient.display && (
                    <Flex
                        position="absolute"
                        className={styles.gradient}
                        opacity={gradient.opacity}
                        pointerEvents="none"
                        style={{
                            ["--gradient-position-x" as string]: `${adjustedX}%`,
                            ["--gradient-position-y" as string]: `${adjustedY}%`,
                            ["--gradient-width" as string]:
                                gradient.width != null ? `${gradient.width / 4}%` : "25%",
                            ["--gradient-height" as string]:
                                gradient.height != null ? `${gradient.height / 4}%` : "25%",
                            ["--gradient-tilt" as string]: gradient.tilt != null ? `${gradient.tilt}deg` : "0deg",
                            background: `linear-gradient(${getGradientDirection()}, ${formatGradientColorStops()})`,
                        }}
                    />
                )}
                {dots.display && (
                    <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        fill
                        pointerEvents="none"
                        className={styles.dots}
                        opacity={dots.opacity}
                        style={
                            {
                                "--dots-color": `var(--${dotsColor})`,
                                "--dots-size": dotsSize,
                            } as React.CSSProperties
                        }
                    />
                )}
                {/* Cursor spotlight effect for dot reveal - follows mouse exactly */}
                {dots.revealOnHover && isHovering && (
                    <Flex
                        position="absolute"
                        pointerEvents="none"
                        style={{
                            left: `${smoothPosition.x - 100}px`,
                            top: `${smoothPosition.y - 100}px`,
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                            mixBlendMode: 'overlay',
                            zIndex: 2,
                            transform: 'translate(0, 0)',
                            transition: 'left 0.05s ease, top 0.05s ease',
                        }}
                    />
                )}
                {lines.display && (
                    <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        fill
                        pointerEvents="none"
                        className={styles.lines}
                        opacity={lines.opacity}
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, var(--brand-on-background-weak) 0, var(--brand-on-background-weak) 0.5px, var(--static-transparent) 0.5px, var(--static-transparent) ${dots.size})`,
                        }}
                    />
                )}
                {grid.display && (
                    <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        fill
                        pointerEvents="none"
                        className={styles.grid}
                        opacity={grid.opacity}
                        style={{
                            backgroundSize: `
                ${grid.width || "var(--static-space-32)"}
                ${grid.height || "var(--static-space-32)"}`,
                            backgroundPosition: "0 0",
                            backgroundImage: `
                linear-gradient(
                  90deg,
                  var(--${grid.color || "brand-on-background-weak"}) 0,
                  var(--${grid.color || "brand-on-background-weak"}) 1px,
                  var(--static-transparent) 1px,
                  var(--static-transparent) ${grid.width || "var(--static-space-32)"}
                ),
                linear-gradient(
                  0deg,
                  var(--${grid.color || "brand-on-background-weak"}) 0,
                  var(--${grid.color || "brand-on-background-weak"}) 1px,
                  var(--static-transparent) 1px,
                  var(--static-transparent) ${grid.height || "var(--static-space-32)"}
                )
              `,
                        }}
                    />
                )}
                {children}
            </Flex>
        );
    },
);

Background.displayName = "Background";

export { Background };