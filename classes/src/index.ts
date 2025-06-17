export abstract class BankAccount {
    private static _totalAccounts: number = 0;
    private readonly _ownerName: string;
    private _balance: number;
    constructor(ownerName: string, initialBalance: number) {
      this._ownerName = ownerName;
      this._balance = initialBalance;
      BankAccount._totalAccounts++;
    }
    static get totalAccounts(): number {
      return BankAccount._totalAccounts;
    }
    abstract calculateInterest(): number;
    deposit(amount: number): void {
      this._balance += amount;
    }
    withdraw(amount: number): void {
      this._balance -= amount;
    }
    getBalance(): number {
      return this._balance;
    }
    static displayTotalAccounts(): void {
      console.log(`Total Accounts: ${BankAccount._totalAccounts}`);
    }
    get ownerName(): string {
      return this._ownerName;
    }
}
  
export class SavingsAccount extends BankAccount {
    private readonly _interestRate: number;
    constructor(ownerName: string, initialBalance: number, interestRate: number) {
      super(ownerName, initialBalance);
      this._interestRate = interestRate;
    }
    calculateInterest(): number {
      return this.getBalance() * this._interestRate;
    }
    get interestRate(): number {
      return this._interestRate;
    }
}
  
export class CheckingAccount extends BankAccount {
    private readonly _transactionLimit: number;
    constructor(ownerName: string, initialBalance: number, transactionLimit: number) {
      super(ownerName, initialBalance);
      this._transactionLimit = transactionLimit;
    }
    withdraw(amount: number): void {
      if (amount <= this._transactionLimit) {
        super.withdraw(amount);
      } else {
        console.log(`Warning: Exceeds transaction limit of $${this._transactionLimit}`);
      }
    }
    calculateInterest(): number {
      return 0;
    }
    get transactionLimit(): number {
      return this._transactionLimit;
    }
}