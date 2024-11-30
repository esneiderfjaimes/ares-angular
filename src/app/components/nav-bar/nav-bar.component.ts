import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { initDropdowns, initFlowbite } from 'flowbite';
import { Flowbite } from '../../utils/Flowbite';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
})
@Flowbite()
export class NavBarComponent implements OnInit {
  @Input() user: User | null | undefined;
  @Output() onlogOutClick = new EventEmitter();
  @Output() onNewLoanClick = new EventEmitter();

  ngOnInit(): void {
    initDropdowns();
    initFlowbite();
  }

  navigateToNewLoan() {
    console.log('navigate to new loan clicked event emitted');
    this.onNewLoanClick.emit();
  }

  logOut() {
    console.log('log out clicked event emitted');
    this.onlogOutClick.emit();
  }
}
