export function simpleWaitFor(func: () => void, ms: number = 3000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            func();
            resolve(null);
        }, ms);
    });
}
