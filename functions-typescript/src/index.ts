export function add(num1: number, num2: number): number {
    return num1 + num2;
}
  
export function concatenate(str1: string, str2: string): string {
    return str1 + str2;
}

export function printInfo(
    name: string,
    age?: number,  // age is now explicitly optional
    gender: string = "Unknown"
): string {
    const ageInfo = age === undefined ? "Unknown" : age;
    return `Name: ${name}, Age: ${ageInfo}, Gender: ${gender}`;
}

export function sumAll(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
} 