function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

interface QueueInterface<T> {
    push(item: T): void;
    pop(): T | undefined;
    getValue(): T[];
}

class Queue<T> implements QueueInterface<T> {
    private storage: T[] = [];
    push(item: T): void {
        this.storage.push(item);
    }
    pop(): T | undefined {
        return this.storage.shift();
    }
    getValue(): T[] {
        return [...this.storage];
    }
}
export { Queue, getProperty };