import { atom } from 'recoil';

export const selectedFoodData = atom({
    key: 'selectedFoodData',
    default: {}
});

export const userState = atom({
    key: 'userState',
    default: "",
});