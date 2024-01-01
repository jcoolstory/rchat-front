import { atom } from "recoil";

export const chatUserListPopupState = atom<boolean>({
    key: "chatUserListPopupState",
    default: false,
});

export const settingViewPopupState = atom<boolean>({
    key: "settingViewPopupState",
    default: false,
});

export const showEnterNamePopupState = atom<boolean>({
    key: "showEnterNamePopupState",
    default: false,
})

export const directMessageViewPopupState = atom<boolean>({
    key: "directMessageViewPopupState",
    default: false,
});

export const createChatViewPopupState = atom<boolean>({
    key: "createChatViewPopupState",
    default: false,
});


export const saveId = (id: string) => {
    localStorage.setItem("id", id);
}

export const loadId = () => {
    return localStorage.getItem("id") || "";
}