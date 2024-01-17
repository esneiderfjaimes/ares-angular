import { Transaction } from './../interfaces/transaction';
import { Loan } from '../interfaces/loan';

export class LoanHelper implements Loan {
    id!: string;
    description!: string;
    amount!: number;
    rate!: number;
    installments!: number;
    transactions!: Transaction[];
    interests!: Transaction[];

    totalRate!: number;
    remainingInstallments!: number;

    progress!: number;
    totalToPay!: number;
    aditionalInterest!: number;
    totalPaid!: number;
    balance!: number;

    constructor(loan: Loan) {
        Object.assign(this, loan);

        console.log(loan);

        this.totalRate = this.amount * (loan.rate / 100);

        this.totalPaid = LoanHelper.sumTransactions(this.transactions);

        this.aditionalInterest = LoanHelper.sumTransactions(this.interests);

        this.totalToPay = loan.amount + this.totalRate + this.aditionalInterest;

        this.progress = Math.floor((this.totalPaid / this.totalToPay) * 100);

        this.balance = this.totalToPay - this.totalPaid;

        this.remainingInstallments = loan.installments - this.transactions.length;
    }

    static sumTransactions(transactions: Transaction[]): number {
        if (transactions.length > 0) {
            const amountsInterests = transactions.map((interest) => {
                return interest.amount;
            });

            if (amountsInterests.length == 1) {
                return amountsInterests[0];
            } else {
                return amountsInterests.reduce((a, b) => a + b, 0);
            }
        } else {
            return 0;
        }
    }
}
