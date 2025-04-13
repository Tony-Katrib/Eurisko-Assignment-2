import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    resetTheme: () => void;
}

const useTheme = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () =>
                set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
            resetTheme: () => set({ theme: 'light' }),
        }),
        { name: 'theme-storage' }
    )
);

export default useTheme;