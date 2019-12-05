import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, radios, boolean } from '@storybook/addon-knobs';
import { InputComponent } from '../../projects/ui-lib/src/lib/atoms/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
// @ts-ignore
import inputMarkdown from '../../projects/ui-lib/src/lib/atoms/input/input.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Atoms.Input', module)
  .addDecorator(
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [InputComponent]
    })
  )
  .addDecorator(withKnobs)
  .add('text', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          text: 'text'
        }, 'text'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        _onChange: action('👊 Input was changed')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('password', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          password: 'password'
        }, 'password'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        _onChange: action('👊 Input was changed')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('checkbox', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          checkbox: 'checkbox'
        }, 'checkbox'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('email', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          email: 'email'
        }, 'email'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        _onChange: action('👊 Input was changed')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('number', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          number: 'number'
        }, 'number'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        _onChange: action('👊 Input was changed')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('radio', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          radio: 'radio'
        }, 'radio'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('hidden', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          hidden: 'hidden'
        }, 'hidden'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        _onChange: action('👊 Input was changed')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('button', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          button: 'button'
        }, 'button'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        inputBtnClicked: action('👊 Button was clicked')
      }
    };
  }, {
      notes: inputMarkdown
  })
  .add('submit', () => {
    return {
      component: InputComponent,
      props: {
        placeholder: text('Placeholder Text', 'Default Placeholder'),
        type: radios('Types', {
          submit: 'submit'
        }, 'submit'),
        inputValue: text('Value Text', ''),
        disabled: boolean('Disabled option', false),
        readonly: boolean('Readonly option', false),
        inputId: text('Add Id', ''),
        className: text('Add Class', ''),
        inputBtnClicked: action('👊 Button was clicked')
      }
    };
  }, {
      notes: inputMarkdown
  });



