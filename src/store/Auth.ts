import {create} from "zustand"
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {User} from "../../types/user";


interface AuthState {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    hydrated: boolean | null;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setHydrated: () => void;
}

const useAuthStore = create<AuthState>()(devtools(persist(immer((set) => ({
    user: null,
    isAdmin: false,
    loading: false,
    hydrated: null,
    error: null,
    setHydrated: () => {
        set({
            hydrated: true
        })
    },
    login: async (email: string, password: string) => {
        // login logic
        try {
            set({
                loading: true
            })

            // mock login logic
            console.log("password: ", password)
            // TODO Replace with actual login logic
            const mockUser: User = {
                id: "1",
                firstName: "John",
                lastName: "Doe",
                email: email,
                role: email === "admin@example.com" ? "admin" : "user",
                joinedDate: new Date().toISOString()
            }

            set({
                user: mockUser,
                isAdmin: mockUser.role === "admin",
            })
        } catch (e: any) {
            console.log("Error while signing in with Discord: ", e);
            set({
                error: e.message,
                user: null,
                isAdmin: false
            })
        } finally {
            set({
                loading: false
            })
        }
    },
    logout: async () => {
        // logout logic
        //TODO Replace with actual logic
        set({loading: true})
        try {

            set({
                user: null,
                error: null,
                isAdmin: false
            })
        } catch (e: any) {
            console.log("Error while signing out: ", e);
            set({
                error: e.message,
            })
        } finally {
            set({
                loading: false
            })
        }

    }
})), {
    name: "auth-storage",
    version: 1,
    onRehydrateStorage() {
        return (state) => {
            state?.setHydrated();
        }
    },
    storage: createJSONStorage(() => localStorage)
})));

export default useAuthStore;