export function debounce(fn: Function, delay: number): (...args: any[]) => void {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            // @ts-expect-error
            fn.apply(this, args);
        }, delay);
    };
}
