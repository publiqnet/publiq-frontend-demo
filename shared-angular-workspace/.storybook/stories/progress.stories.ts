import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ProgressComponent } from '../../projects/ui-lib/src/lib/molecules/progress/progress.component';
// @ts-ignore
import progressMarkdown from '../../projects/ui-lib/src/lib/molecules/progress/progress.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { ChipComponent } from '../../projects/ui-lib/src/lib/molecules/chip/chip.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';

storiesOf('Publiq Design|Molecules.Progress', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ProgressComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: ProgressComponent,
      props: {
        minValue: number('Add Min Value', 0),
        maxValue: number('Add Max Value', 50),
        defaultValue: number('Add Default Value', 30),
        className: text('Add Classes', ''),
        titleName: text('Add Currency Name', 'PBQ'),
        onRange: action('👊Value of Range')
      }
    };
  }, {
      notes: progressMarkdown
  });
