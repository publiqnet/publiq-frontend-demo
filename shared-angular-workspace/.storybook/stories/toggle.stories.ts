import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ToggleComponent } from '../../projects/ui-lib/src/lib/atoms/toggle/toggle.component';
// @ts-ignore
import toggleMarkdown from '../../projects/ui-lib/src/lib/atoms/toggle/toggle.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '../../projects/ui-lib/src/lib/atoms/select/select.component';

storiesOf('Publiq Design|Atoms.Toggle', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ToggleComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: ToggleComponent,
      props: {
        className: text('Add Class', ''),
        isChecked: boolean('isChecked', true),
        onToggle: action('👊Toggle Input Was Changed')
      }
    };
  }, {
      notes: toggleMarkdown
  });
