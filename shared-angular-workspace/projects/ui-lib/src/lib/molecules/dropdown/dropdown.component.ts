import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
import { Avatar } from '../../../core/models/avatar';
import { DropdownRoleDataOptions } from '../../../core/models/dropdownRoleData';
import { DropdownDataOptions } from '../../../core/models/dropdownData';


@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(DropdownComponent)]
})

export class DropdownComponent extends FormControlHelper implements OnChanges {
  @Input('type') type: string = 'withIcon';
  @Input() optionsData: DropdownDataOptions[];
  @Input() roleData: DropdownRoleDataOptions[];
  @Input() className: string = '';
  @Input() selectedOptionValue: string = '';
  @Input() addPlaceholder: string = '';
  @Input() isOpen: boolean = false;
  @Input() isNone: boolean = true;
  @Input() isNoneText: string = 'None';
  @Input() disableSelectChange: boolean = false;
  @Output() onSelectChange = new EventEmitter<any>();
  @Output() onRoleChange = new EventEmitter<any>();
  @Output() onCloseDropdown = new EventEmitter<any>();
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter();
  public active: boolean = false;
  public openDropdown: boolean = false;
  public selectedOptionData: DropdownDataOptions = null;
  public selectedRoleData: DropdownRoleDataOptions = null;
  public lastSavedValue = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.optionsData && this.optionsData.length) {
      this.optionsData.map((data: DropdownDataOptions) => data.metaData = new Avatar(data.metaData));
    }

    if (this.roleData && this.roleData.length) {
      this.selectedRoleData = this.roleData.find( r => r.status === true);
    }

    if (this.selectedOptionValue && this.optionsData && this.optionsData.length) {
      this.selectedOptionData = this.optionsData.find( r => r.value === this.selectedOptionValue);
    }
  }

  onOptionChange(item) {
    this.onChange(item.value);
    this.selectedOptionData = item;
    this.selectedOptionValue = item.value;
    this.onSelectChange.emit(item);
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  onOptionEnter(item) {
    this.onChange(item.value);
    this.selectedOptionData = item;
    this.selectedOptionValue = item.value;
  }

  clearOption() {
    this.selectedOptionData = null;
    this.selectedOptionValue = '';
    this.onChange('');
  }

  submitOption() {
    this.lastSavedValue = this.selectedOptionData;
    if (this.selectedOptionData == null) {
      this.onSelectChange.emit('');
    } else {
      this.onSelectChange.emit(this.selectedOptionData.value);
    }
  }

  unsetOption() {
    this.selectedOptionData = null;
    this.selectedOptionValue = '';
    this.onSelectChange.emit(null);
    this.onChange('');
  }

  _onCloseDropdown() {
    this.onCloseDropdown.emit('close');
    this.selectedOptionData = this.lastSavedValue;
    this.selectedOptionValue = this.lastSavedValue.value;
  }

  _onRoleChange(slug) {
    this.roleData.forEach(data => {
      if (data.slug == slug) {
        this.selectedRoleData = data;
        data.status = true;
      } else {
        data.status = false;
      }
    });
    this.onRoleChange.emit(this.selectedRoleData);
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  ToggleActive() {
    this.active = !this.active;
    this.openDropdown = !this.openDropdown;
  }

  toggleOpen() {
    this.active = false;
    this.isOpenChange.emit(this.active);
  }

}
