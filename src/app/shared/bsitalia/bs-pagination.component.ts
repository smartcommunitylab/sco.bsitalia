import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-pagination',
  templateUrl: './bs-pagination.component.html',
})
export class BSPaginationComponent implements OnInit{
    @Input()
    pageSize = 0;
    @Input()
    page = 1;

    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    lastPage = 0;
    _total = 0;

    @Input()
    set total(val: number) {
        this._total = val;
        this.computeLast();
    }

    get total(): number {
        return this._total;
    }

    private computeLast(): void {
        if (this.pageSize) this.lastPage = Math.floor(this.total / this.pageSize) + 1;
    }


    ngOnInit(): void {
        this.computeLast();
    } 

    goToPage(num: number): void {
        window.console.log(num);
        if (num >= 1 && num <= this.lastPage) {
            this.page = num;
            this.pageChange.emit(this.page);
        }
    }

    changeSize(num: number): void {
        this.pageSize = num;
        this.computeLast();
        this.pageSizeChange.emit(this.pageSize);
    } 
}