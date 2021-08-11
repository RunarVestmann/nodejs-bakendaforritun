export const shorten = (text: string, length: number = 35): string => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
};
