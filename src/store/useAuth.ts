import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
    accessToken: string | null
    expiresIn: number | null
    setAuth: (token: string, expires: number) => void
    logout: () => void
}

const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            expiresIn: null,
            setAuth: (token, expires) => set({ accessToken: token, expiresIn: expires }),
            logout: () => set({ accessToken: null, expiresIn: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuth