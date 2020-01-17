import { Component, EventEmitter, Input, Output, HostBinding, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'ui-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss'],
})
export class LoadingBlockComponent implements AfterViewInit, OnChanges {
  @Input() type: string = 'grid';
  @Input() className: string = '';
  @Input() width: number = 120;
  @Input() height: number = 15;
  @Input() borderRadius: number = 4;
  @HostBinding('class.loading-block--grid') isGrid: boolean = false;
  @HostBinding('class.loading-block--single') isSingle: boolean = false;


  ngAfterViewInit() {
    this.isGrid = this.type === 'grid';
    this.isSingle = this.type === 'single';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isGrid = this.type === 'grid';
    this.isSingle = this.type === 'single';
  }
}
