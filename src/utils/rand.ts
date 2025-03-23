export const generateUniqueKey = (keyLength: number): string => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomLength = keyLength - 5;
    let result = "";

    for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }

    const timestamp = Date.now() % 100000;

    return `${result}${timestamp.toString().padStart(5, "0")}`;
}

