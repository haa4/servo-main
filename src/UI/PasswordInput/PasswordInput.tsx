"use client";

import React, { useState, forwardRef } from "react";
import { IconButton } from "@/UI/IconButton/IconButton";
import { Input, InputProps } from "@/UI/Input/Input";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            {...props}
            ref={ref}
            type={showPassword ? "text" : "password"}
            hasSuffix={
                <IconButton
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                    variant="ghost"
                    icon={showPassword ? "eyeOff" : "eye"}
                    size="s"
                    type="button"
                />
            }
        />
    );
});

PasswordInput.displayName = "PasswordInput";
