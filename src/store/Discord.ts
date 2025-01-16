"use client"
import {create} from "zustand"
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {Roles, User} from "../../types/Discord";
import axios from "axios";
import ShowToast from "@/components/ShowToast";
import showToast from "@/components/ShowToast";


interface DiscordState {
    user: User | null;
    allUsers: User[];
    roles: Roles[];
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    hydrated: boolean | null;
    setHydrated: () => void;
    sendJoinRequest: () => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    getUsers: () => Promise<void>;
    addRole: (role: Roles, color: string) => Promise<void>;
    addUserRole: (userId: string, roleId: string) => Promise<void>;
    addMember: (userId: string, accessToken: string) => Promise<void>;
    getRoles: () => Promise<void>;
    verifyUser: (code: string) => Promise<void>;
    getCurrentUser: () => Promise<void>;
}

const useDiscord = create<DiscordState>()(devtools(persist(immer((set, get) => ({
        user: null,
        allUsers: [],
        roles: [],
        loading: false,
        error: null,
        hydrated: null,
        accessToken: null,
        setHydrated: () => {
            set({
                hydrated: true
            })
        },
        sendJoinRequest: async () => {
            set({
                loading: true
            });
            try {
                // Perform the sign-in operation
                window.location.href = `https://discord.com/oauth2/authorize?client_id=1325532102443274320&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&scope=identify+email+guilds.join`


                set({
                    error: null,
                });

                ShowToast("success", "Join request sent successfully", "default");
            } catch (e: any) {
                console.log("Error while sending join request: ", e);
                set({
                    error: e.message,
                    user: null,
                });
                ShowToast(
                    "error",
                    "An error occurred while sending the request to join the Discord server.",
                    "destructive"
                );
            } finally {
                set({
                    loading: false
                });
            }
        },

        updateUser: async (user: User) => {
            set({
                loading: true
            })
            try {
                set({
                    user: user,
                    error: null,
                    allUsers: [...get().allUsers.filter((u) => u.id !== user.id), user],
                })

            } catch (e: any) {
                console.log("Error while updating user: ", e);
                set({
                    error: e.message,
                })
            } finally {
                set({
                    loading: false
                })
            }
        },
        getUsers: async () => {
            try {
                set({
                    loading: true
                })
                const res = await axios.get(`/api/auth/send`);

                set({
                    allUsers: res.data,
                    error: null,
                })

                showToast("success", "Users fetched successfully", "default");

            } catch (e: any) {
                console.log("Error while fetching users: ", e);
                set({
                    error: e.message,
                    allUsers: [],
                })
                showToast("error", "An error occurred while fetching the users.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        }
        ,
        addRole: async (role: Roles, color: string) => {
            try {
                set({
                    loading: true
                })
                const {data} = await axios.post(`/api/discord/users/role`, {role, color});
                set({
                    error: null,
                    roles: [...get().roles, data.data],
                })
                ShowToast("success", "Role added successfully", "default");
            } catch (e: any) {
                console.log("Error while adding role: ", e);
                set({
                    error: e.message,
                    roles: [],
                })
                ShowToast("error", "An error occurred while adding the role.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        },
        addUserRole: async (userId: string, roleId: string) => {
            try {
                set({
                    loading: true
                })
                await axios.post(`/api/discord/users/role/assign`, {userId, roleId});
                set({
                    error: null,
                })
                showToast("success", "Role assigned successfully", "default");
            } catch (e: any) {
                console.log("Error while adding user role: ", e);
                set({
                    error: e.message,
                })
                showToast("error", "An error occurred while assigning the role to the user", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        }
        ,
        addMember: async (userId: string, accessToken: string) => {
            try {
                set({
                    loading: true
                })
                await axios.post(`/api/discord/users`, {userId, accessToken});
                showToast("success", "Member added successfully", "default");

                await get().getUsers();

                set({
                    error: null,
                })

            } catch (e: any) {
                console.log("Error while adding member: ", e);
                showToast("error", "An error occurred while adding the member.", "destructive");
                set({
                    error: e.message,
                    user: null,
                })
            } finally {
                set({
                    loading: false
                })
            }
        },
        getRoles: async () => {
            try {
                set({
                    loading: true
                })
                const {data} = await axios.get(`/api/discord/roles`);
                set({
                    roles: data.data,
                })
                showToast("success", "Roles fetched successfully", "default");

            } catch (e: any) {
                console.log("Error while fetching roles: ", e);
                set({
                    error: e.message,
                    roles: [],
                })
                showToast("error", "An error occurred while fetching the roles.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        },
        verifyUser: async (code: string) => {
            try {
                set({
                    loading: true
                })
                const {data} = await axios.post(`/api/auth?code=${code}`);
                console.log("data", data);
                set({
                    accessToken: data.data.access_token,
                    error: null,
                })
                await get().getCurrentUser();
                showToast("success", "User verified successfully", "default");

            } catch (e: any) {
                console.log("Error while verifying user: ", e);
                set({
                    error: e.message,
                    user: null,
                })
                showToast("error", "An error occurred while verifying the user.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        },
        getCurrentUser: async () => {
            try {
                set({
                    loading: true
                })
                const {data} = await axios.get(`/api/auth`, {
                    headers: {
                        Authorization: `${get().accessToken}`
                    }
                });
                set({
                    user: data.data.user,
                    // push the user only if it doesn't exist in the array otherwise update it
                    allUsers: [...get().allUsers.filter((u) => u.id !== data.data.user.id), data.data.user],
                    error: null,
                })

                await axios.post(`/api/discord/users/save`, {
                    userId: data.data.user.id,
                    username: data.data.user.username,
                    accessToken: get().accessToken
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })


                showToast("success", "User fetched successfully", "default");

            } catch (e: any) {
                console.log("Error while fetching user: ", e);
                set({
                    error: e.message,
                    user: null,
                })
                showToast("error", "An error occurred while fetching the user.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        },
        logout: async () => {
            try {
                set({
                    loading: true
                })
                set({
                    user: null,
                    accessToken: null,
                    error: null,
                })
                showToast("success", "User logged out successfully", "default");

            } catch (e: any) {
                console.log("Error while logging out: ", e);
                set({
                    error: e.message,
                })
                showToast("error", "An error occurred while logging out the user.", "destructive");
            } finally {
                set({
                    loading: false
                })
            }
        }
    })),
    {
        name: "discord-storage",
        version:
            1,
        storage:
            createJSONStorage(() => localStorage),
        onRehydrateStorage:
            () => {
                return (state => state?.setHydrated)
            }
    }
)))


export default useDiscord;