import { CONTACT_URL } from './urls';

export const sendMessage = async (message) => {
    const response = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    });
    const data = await response.json();
    return data;
};
