// src/components/DarkReaderLock.tsx (Client Component)
"use client";

import { useEffect } from "react";
import React from "react";

export default function DarkReaderLock({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lock = document.createElement("meta");
        lock.name = "darkreader-lock";
        document.head.appendChild(lock);

        return () => {
            const existingLock = document.querySelector('meta[name="darkreader-lock"]');
            if (existingLock) {
                document.head.removeChild(existingLock);
            };
        };
    }, []);

    return <>{children}</>;
}