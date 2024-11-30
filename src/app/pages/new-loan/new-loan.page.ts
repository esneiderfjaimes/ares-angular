import { Transaction } from './../../shared/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Loan } from '../../shared/interfaces/loan';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Flowbite } from '../../utils/Flowbite';
import { Timestamp } from 'firebase/firestore/lite';
import { LoanHelper } from '../../shared/helpers/loan-helper';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoanRemote } from '../../shared/interfaces/loan-remote';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-loan',
  templateUrl: './new-loan.page.html',
})
@Flowbite()
export class NewLoanPage {
  loanForm: FormGroup;
  isProcessing: boolean = false;

  constructor(
    private fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.loanForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required, Validators.min(10000)]],
      rate: [null, [Validators.required, Validators.min(0)]],
      installments: ['1', Validators.required], // Valor predeterminado "1"
    });
  }

  static tag = 'loanpage';

  onSubmit(): void {
    if (this.loanForm.valid && !this.isProcessing) {
      const loan: LoanRemote = {
        description: this.loanForm.value.description,
        amount: this.loanForm.value.amount,
        rate: this.loanForm.value.rate,
        installments: this.loanForm.value.installments,
        isArchived: false,
      };
      this.isProcessing = true;
      this.firestoreService.insertLoan(loan).subscribe({
        next: (loanId) => {
          console.log('Loan inserted successfully with ID:', loanId);
          this.router.navigate(['/loan'], { queryParams: { id: loanId } });
        },
        error: (err) => {
          console.error('Error inserting loan:', err);
          this.isProcessing = false;
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
