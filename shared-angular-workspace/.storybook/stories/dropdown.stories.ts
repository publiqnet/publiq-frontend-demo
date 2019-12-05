import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, radios, text, boolean } from '@storybook/addon-knobs';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
// @ts-ignore
import dropdownMarkdown from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component.notes.md';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';

storiesOf('Publiq Design|Molecules.Dropdown', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [AvatarComponent, ClickOutsideDirective, DropdownComponent, ButtonComponent],
      providers: [UtilService],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: DropdownComponent,
      props: {
        type: radios('type', {
          'Default': 'default',
        }, 'default'),
        optionsData: object('Option Data', [{
          value: 'Test value',
          text: 'Test text',
          user: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'}
        }]),
        className: text('Add Class', ''),
        addPlaceholder: text('Add Placeholder', 'Select Status'),
        onSelectChange: action('Selected Option')
      }
    };
  }, {
      notes: dropdownMarkdown
  })
  .add('afterSubmit', () => {
    return {
      component: DropdownComponent,
      props: {
        type: radios('type', {
          'After Submit': 'afterSubmit',
        }, 'afterSubmit'),
        optionsData: object('Option Data', [{
          value: 'test-value-1',
          text: 'Test text 1',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News 1'},
        },
          {
            value: 'test-value-2',
            text: 'Test text 2',
            metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News 2'},
          }]),
        className: text('Add Class', ''),
        selectedOptionValue: text ('Selected Option Value', ''),
        addPlaceholder: text('Add Placeholder', 'Select Status'),
        onSelectChange: action('Selected Option'),
        onCloseDropdown: action('Close Dropdown')
      }
    };
  }, {
    notes: dropdownMarkdown
  })
  .add('withIcon', () => {
    return {
      component: DropdownComponent,
      props: {
        type: radios('type', {
          'With Icon': 'withIcon',
        }, 'withIcon'),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        className: text('Add Class', ''),
        selectedOptionValue: text ('Selected Option Value', ''),
        addPlaceholder: text('Add Placeholder', 'Select Status'),
        onSelectChange: action('Selected Option')
      }
    };
  }, {
      notes: dropdownMarkdown
  })
  .add('role', () => {
    return {
      component: DropdownComponent,
      props: {
        type: radios('type', {
          'role': 'role',
        }, 'role'),
        roleData: object('Option Data', [{
          value: 'Editor',
          slug: 'editor',
          status: true,
        },
          {
            value: 'Contributor',
            slug: 'contributor',
            status: false,
          }
        ]),
        disableSelectChange: boolean('disable Select Change', false),
        className: text('Add Class', ''),
        addPlaceholder: text('Add Placeholder', 'Select Status'),
        onSelectChange: action('Selected Option'),
        onRoleChange: action('Selected Option')
      }
    };
  }, {
      notes: dropdownMarkdown
  });


