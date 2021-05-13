import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-icon',
  template: `
    <svg [ngClass]="class" class="icon "><use [attr.xlink:href]="'/bootstrap-italia/dist/svg/sprite.svg#' + name"></use></svg>
  `
})
export class BSIconComponent {
  @Input()
  name = '';

  @Input()
  class = '';
}
