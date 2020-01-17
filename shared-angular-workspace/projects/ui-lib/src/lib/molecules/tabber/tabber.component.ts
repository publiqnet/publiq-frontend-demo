import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges, DoCheck
} from '@angular/core';
import { TabTypeOptions } from '../../../core/models/tabber';

@Component({
  selector: 'ui-tab',
  templateUrl: './tabber.component.html',
  styleUrls: ['./tabber.component.scss'],
})

export class TabberComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  @Input('type') type: string = 'buttons';
  @Input('tabs') tabs: TabTypeOptions[] = [];
  @Input('currentValue') currentValue: any = null;
  @Output() onTabChange = new EventEmitter<any>();
  @Input() className: string = '';
  @ViewChild('tabberNavigation', {static: false}) tabberNavigation;
  @ViewChild('tabberButtons', {static: false}) tabberButtons;

  public leftVal: string = null;
  public widthVal: string = null;
  public heightVal: string = null;
  public itemSelector: string = '';
  private oldTabs: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.itemSelector = this.type === 'navigation' ? '.tabber__item' : '.button-tabber__item';

    if (this.tabs && this.tabs.length > 0 && !this.tabs.some(tab => tab.value === this.currentValue)) {
      this.currentValue = this.tabs[0].value;
      this.onTabChange.emit(this.tabs[0].value);
    }
    this.oldTabs = (this.tabs && this.tabs.length) ? this.tabs : this.oldTabs;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tabs) {
      if (changes.currentValue) { this.calculatePositions(); }
      this.cdr.detectChanges();
    }
  }

  ngDoCheck(): void {
    if (this.oldTabs !== this.tabs) {
      this.oldTabs = this.tabs;
      this.calculatePositions();
    }
  }

  ngAfterViewInit() {
    this.calculatePositions();
    this.cdr.detectChanges();
  }

  calculatePositions() {
    const element = (this.tabberNavigation || this.tabberButtons) ?
      (this.tabberNavigation || this.tabberButtons).nativeElement.querySelector(this.itemSelector + '[data-value="' + this.currentValue + '"]')
      : undefined;

    if (!element) {
      return;
    }

    if (this.type === 'navigation') {
      this.leftVal = (element.offsetLeft + element.offsetWidth / 2 - 8) + 'px';
    }

    if (this.type === 'buttons') {
      this.leftVal = element.offsetLeft + 'px';
      this.widthVal = element.offsetWidth + 'px';
      this.heightVal = element.offsetHeight + 'px';
    }
  }

  changeTab(tab) {
    this.currentValue = tab.value;
    this.calculatePositions();
    this.onTabChange.emit(tab.value);
  }
}
