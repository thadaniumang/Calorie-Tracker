import { atom } from 'recoil';

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
        const savedValue = localStorage.getItem(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        });
    }
};

const loggedInState = atom({
    key: 'loggedInState',
    default: false,
    effects_UNSTABLE: [localStorageEffect('loggedIn')],
});

const userState = atom({
    key: 'userState',
    default: {},
    effects_UNSTABLE: [localStorageEffect('user')],
});

export { loggedInState, userState };