"use client";

import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { ElementType, Icon } from "@/UI";

interface CommonProps {
    prefixIcon?: string;
    suffixIcon?: string;
    fillWidth?: boolean;
    iconSize?: "xs" | "s" | "m" | "l" | "xl";
    selected?: boolean;
    unstyled?: boolean;
    children: ReactNode;
    href?: string;
    style?: React.CSSProperties;
    className?: string;
    gradientColors?: string[]; // Array of colors for gradient
    gradientDirection?: "left-to-right" | "top-to-bottom"; // Gradient direction
    gradientRatios?: number[]; // Array of ratios for each color (0-1)
}

export type SmartLinkProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
    (
        {
            href,
            prefixIcon,
            suffixIcon,
            fillWidth = false,
            iconSize = "xs",
            style,
            className,
            selected,
            unstyled = false,
            children,
            gradientColors,
            gradientDirection = "left-to-right",
            gradientRatios,
            ...props
        },
        ref,
    ) => {
        const content = (
            <>
                {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
                {children}
                {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
            </>
        );

        let gradientStyle: React.CSSProperties = {};

        if (gradientColors && gradientColors.length > 0) {
            let gradientString = "";
            if (gradientDirection === "left-to-right") {
                gradientString = "linear-gradient(to right, ";
            } else {
                gradientString = "linear-gradient(to bottom, ";
            }

            if (gradientRatios && gradientRatios.length === gradientColors.length) {
                gradientString += gradientColors
                    .map((color, index) => `${color} ${gradientRatios[index] * 100}%`)
                    .join(", ");
            } else {
                // If ratios are not provided, distribute colors evenly
                const ratioStep = 100 / gradientColors.length;
                gradientString += gradientColors
                    .map((color, index) => `${color} ${ratioStep * index}%`)
                    .join(", ");
            }

            gradientString += ")";
            gradientStyle = {
                backgroundImage: gradientString,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            };
        }

        const commonProps = {
            ref,
            className: classNames(className, "align-items-center display-inline-flex g-8 radius-s", {
                "fill-width": fillWidth,
                "fit-width": !fillWidth,
                "px-4 mx-4": !unstyled,
            }),
            style: !unstyled
                ? {
                    ...(selected && {
                        textDecoration: "underline",
                    }),
                    ...gradientStyle,
                    ...style,
                }
                : {
                    textDecoration: "none",
                    ...gradientStyle,
                    ...style,
                },
            ...props,
        };

        return (
            <ElementType href={href} {...commonProps}>
                {content}
            </ElementType>
        );
    },
);

SmartLink.displayName = "SmartLink";

export { SmartLink };

// How to use
/*

// Example 1: Basic usage
<SmartLink href="/example">
    Example Link
</SmartLink>

// Example 2: With icons and fill width
<SmartLink href="/example" prefixIcon="home" suffixIcon="arrow-right" fillWidth>
    Home
</SmartLink>

// Example 3: With gradient (default ratios)
<SmartLink href="/example" gradientColors={["black", "white", "black"]}>
    Gradient Link
</SmartLink>

// Example 4: With gradient and custom ratios
<SmartLink href="/example" gradientColors={["red", "yellow", "blue"]} gradientRatios={[0, 0.5, 1]}>
    Custom Gradient Link
</SmartLink>

// Example 5: With gradient and top to bottom direction
<SmartLink href="/example" gradientColors={["lightblue", "darkblue"]} gradientDirection="top-to-bottom">
    Vertical Gradient Link
</SmartLink>

// Example 6: with custom style
<SmartLink href="/example" style={{fontWeight: 'bold'}}>
    Bold Link
</SmartLink>

// Example 7: with custom classname
<SmartLink href="/example" className="my-custom-class">
    Styled Link
</SmartLink>
*/