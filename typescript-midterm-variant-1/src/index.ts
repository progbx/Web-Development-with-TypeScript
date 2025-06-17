export interface Vehicle {
    model: string;
    year: number;
    description(): string;
}

export class Car implements Vehicle {
    model: string;
    year: number;
    color?: string;

    constructor(model: string, year: number, color?: string) {
        this.model = model;
        this.year = year;
        if (color) {
            this.color = color;
        }
    }

    description(): string {
        return `${this.model} ${this.year}`;
    }
}

export class ElectricCar extends Car {
    batteryLife: number;

    constructor(model: string, year: number, batteryLife: number, color?: string) {
        super(model, year, color);
        this.batteryLife = batteryLife;
    }

    description(): string {
        return `${this.model} ${this.year} ${this.batteryLife}`;
    }

    chargeBattery(life?: number): void {
        this.batteryLife = life !== undefined ? life : 100;
    }
}

export function getFleetYears(vehicle: Vehicle): number[];
export function getFleetYears(vehicle: Vehicle[]): number[];
export function getFleetYears(param: Vehicle | Vehicle[]): number[] {
    if (Array.isArray(param)) {
        return param.map(vehicle => vehicle.year);
    }
    return [param.year];
}

export function getModels(...vehicle: Vehicle[]): string[] {
    if (vehicle.length === 0) {
        return ["No Models"];
    }
    return vehicle.map(vehicle => vehicle.model);
}