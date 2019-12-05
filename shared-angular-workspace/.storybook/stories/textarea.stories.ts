import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { TextareaComponent } from '../../projects/ui-lib/src/lib/atoms/textarea/textarea.component';
// @ts-ignore
import textareaMarkdown from '../../projects/ui-lib/src/lib/atoms/textarea/textarea.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '../../projects/ui-lib/src/lib/atoms/select/select.component';

storiesOf('Publiq Design|Atoms.Textarea', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [TextareaComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: TextareaComponent,
      props: {
        placeholder: text('Placeholder', 'Testing Placeholder'),
        rows: number('Rows', 4),
        cols: number('Cols', 30),
        resize: boolean('Disable Resize', false),
        className: text('Add Class'),
      }
    };
  }, {
      notes: textareaMarkdown
  });
