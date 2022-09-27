import create from "zustand";
import { persist } from "zustand/middleware";

const userState = persist(
    (set) => ({
        user: null,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
        // users: null,
        // expenses: null,
        // appartments: null,
        // payments: null,
        setUser: (user) => {
            console.log({ user });
            set(() => ({ user, isLoggedIn: true }));
        },
        // setToken: (token) => {
        //     // console.log({token})
        //     set(() => ({ token }));
        // },
        // setRefreshToken: (refreshToken) => {
        //     // console.log({refreshToken})
        //     set(() => ({ refreshToken }));
        // },
        // setUsers: (users) => {
        //     // console.log({ users });
        //     set(() => ({ users }));
        // },
        // setExpenses: (expenses) => {
        //     // console.log({ expenses })
        //     set(() => ({ expenses }))
        // },
        // setAppartments: (appartments) => {
        //     // console.log({ appartments })
        //     set(() => ({ appartments }))
        // },
        // setPayments: (payments) => {
        //     // console.log({ payments })
        //     set(() => ({ payments }))
        // },
        // removeToken: () => set({ token: null }),
        // logOut: () => set({ user: null, token: null, refreshToken: null, isLoggedIn: false }),
    }),
    { name: "user-setting" }
);

export const useUserState = create(userState);