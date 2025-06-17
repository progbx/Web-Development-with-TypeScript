export type ServiceConfig = {
    serviceName: string;
    serviceId: number;
};
  
export const defaultServiceConfig: ServiceConfig = {
    serviceName: 'global',
    serviceId: 1,
};
  
export function validateUserInput(userInput: unknown): string {
    if (typeof userInput === 'object' && userInput !== null) {
      const input = userInput as Record<string, unknown>;
      if (!input.name || typeof input.name !== 'string' || input.name.trim() === '') {
        return 'Invalid input format';
      }
      if (typeof input.age !== 'number') {
        return 'Invalid input format';
      }
      if (typeof input.subscribed !== 'boolean') {
        return 'Invalid input format';
      }
      return 'Valid User Input';
    }
    return 'Invalid input format';
}
  
export function handleInput(input: string | number | boolean): string | number | boolean {
    if (typeof input === 'string') {
      return `${input} - is a string!`;
    } else if (typeof input === 'number') {
      return input + 10;
    } else if (typeof input === 'boolean') {
      return !input;
    }
    return 'Error';
}

export function logger(messages: string[], config?: ServiceConfig): Record<string, string> {
    const serviceConfig = config || defaultServiceConfig;
    const result: Record<string, string> = {};
    messages.forEach((message, index) => {
      const logKey = `${serviceConfig.serviceId}-${index}`;
      result[logKey] = `[${serviceConfig.serviceName}] ${message}`;
    });
    return result;
}