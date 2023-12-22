import { Component, Input } from '@angular/core';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'user-item',
  template: `
    <div
      class="
        w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow 
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <div class="flex flex-col items-center p-10">
        @switch (user) { @case (null) {

        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          No user found
        </h5>

        } @case (undefined) {

        <img
          src="https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white pt-5">
          Loading...
        </h5>

        } @default {

        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          [src]="
            user.imageUrl ||
            'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
          "
          alt="image profile"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {{ user.name }}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Professional debtor
        </span>

        }}
      </div>
    </div>
  `,
})
export class UserComponent {
  @Input() user: User | null | undefined;
}
