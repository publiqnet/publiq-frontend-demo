import { EventEmitter, OnInit, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { TabTypeOptions } from '../../../core/models/tabber';
export declare class TabberComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
    private cdr;
    type: string;
    tabs: TabTypeOptions[];
    currentValue: any;
    onTabChange: EventEmitter<any>;
    className: string;
    tabberNavigation: any;
    tabberButtons: any;
    leftVal: string;
    widthVal: string;
    heightVal: string;
    itemSelector: string;
    private oldTabs;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    calculatePositions(): void;
    changeTab(tab: any): void;
}
