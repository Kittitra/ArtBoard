// lib/store/designStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Version } from "@/lib/type";

interface DesignStore {
    selectedVersions: Version[];
    setSelectedVersions: (versions: Version[]) => void;
    currentVersion: Version | null;
    setCurrentVersion: (version: Version | null) => void;
}

export const useDesignStore = create<DesignStore>()(
    persist(
        (set) => ({
            selectedVersions: [],
            setSelectedVersions: (versions) => set({ selectedVersions: versions }),
            currentVersion: null,
            setCurrentVersion: (version) => set({ currentVersion: version }),
        }),
        {
            name: "design-store", // ← ชื่อ key ใน localStorage
        }
    )
);