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