export function once(_target: any, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let hasBeenCalled = false;
    let result: any;

    descriptor.value = function (...args: any[]) {
        if (!hasBeenCalled) {
            result = originalMethod.apply(this, args);
            hasBeenCalled = true;
        }
        return result;
    };

    return descriptor;
}

export function identifier(uid: string) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            identify() {
                return `${constructor.name}-${uid}`;
            }
        };
    };
}