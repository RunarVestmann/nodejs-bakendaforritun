import { ORDER_URL } from './urls';

export const completeOrder = async (order) => {
    const response = await fetch(ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
};
