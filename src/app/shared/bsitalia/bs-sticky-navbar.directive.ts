import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[bsNavbar]'
})
export class BSStickyNavbarDirective {

    isNavbarCollapsed = false;
    isSticky = false;

    constructor(public header: ElementRef) {
        this.isSticky = header.nativeElement.classList.contains('sticky');
        setTimeout(() => {
            $.getScript('bootstrap-italia/dist/js/plugins/navbar.js');
        });
    }

     @HostListener('window:scroll', ['$event']) // for window scroll events
     onScroll(): void {
       if (!this.isSticky) {
         return;
       }

       const pos = window.scrollY;
       if (pos > 100 && !this.isNavbarCollapsed) {
         this.toggleNavbar();
       }
       else if (pos < 100 && this.isNavbarCollapsed) {
         this.toggleNavbar();
       }
     }

     toggleNavbar(): void {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
        if (this.isNavbarCollapsed) {
          this.header?.nativeElement.classList.add('bs-sticky');
        } else  {
          this.header?.nativeElement.classList.remove('bs-sticky');
        }
      }
}