import { moduleMetadata, storiesOf } from '@storybook/angular';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, radios, boolean } from '@storybook/addon-knobs';
// @ts-ignore
import buttonMarkdown from '../../projects/ui-lib/src/lib/atoms/button/button.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';


storiesOf('Publiq Design|Atoms.Button', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ButtonComponent]
    }
  ))
  .addDecorator(withKnobs)
  .add('ordinary', () => {
    return {
      component: ButtonComponent,
      props: {
        text: text('text', 'Button'),
        type: radios('type', {
          Ordinary: 'ordinary'
        }, 'ordinary'),
        size: radios('size', {
          'X-small': 'xsmall',
          Small: 'small',
          Medium: 'medium',
          Large: 'large'
        }, 'medium'),
        iconButton: boolean('iconButton', false),
        iconClassName: text('icon', ''),
        fullRadius: boolean('fullRadius', false),
        isFollowing: boolean('isFollowing', false),
        btnClicked: action('👊 Button was clicked'),
        className: text('Add Class', ''),
      }
    };
  }, {
      notes: buttonMarkdown
  })
  .add('primary', () => {
    return {
      component: ButtonComponent,
      props: {
        text: text('text', 'Button'),
        type: radios('type', {
          Primary: 'primary',
        }, 'primary'),
        size: radios('size', {
          'X-small': 'xsmall',
          Small: 'small',
          Medium: 'medium',
          Large: 'large'
        }, 'medium'),
        iconButton: boolean('iconButton', false),
        iconClassName: text('icon', ''),
        fullRadius: boolean('fullRadius', false),
        isFollowing: boolean('isFollowing', false),
        btnClicked: action('👊 Button was clicked'),
        className: text('Add Class', ''),
      }
    };
  }, {
    notes: buttonMarkdown
  })
  .add('secondary', () => {
    return {
      component: ButtonComponent,
      props: {
        text: text('text', 'Button'),
        type: radios('type', {
          Secondary: 'secondary',
        }, 'secondary'),
        size: radios('size', {
          'X-small': 'xsmall',
          Small: 'small',
          Medium: 'medium',
          Large: 'large'
        }, 'medium'),
        iconButton: boolean('iconButton', false),
        iconClassName: text('icon', ''),
        fullRadius: boolean('fullRadius', false),
        isFollowing: boolean('isFollowing', false),
        btnClicked: action('👊 Button was clicked'),
        className: text('Add Class', ''),
      }
    };
  }, {
      notes: buttonMarkdown
  });
