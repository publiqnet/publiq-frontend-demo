import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { SelectComponent } from '../../projects/ui-lib/src/lib/atoms/select/select.component';
// @ts-ignore
import selectMarkdown from '../../projects/ui-lib/src/lib/atoms/select/select.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { ChipComponent } from '../../projects/ui-lib/src/lib/molecules/chip/chip.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';

storiesOf('Publiq Design|Atoms.Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [SelectComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: SelectComponent,
      props: {
        multiple: boolean('Multiple', false),
        optionsData: object('Option Data', [{
          value: 'test key',
          text: 'test value'
        }]),
        className: text('Add Class', ''),
      }
    };
  }, {
      notes: selectMarkdown
  });
