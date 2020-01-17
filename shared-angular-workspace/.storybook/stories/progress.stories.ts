import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, number, radios } from '@storybook/addon-knobs';
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
        type: radios('type', {
          'default': 'default',
        }, 'default'),
        minValue: number('Add Min Value', 0),
        maxValue: number('Add Max Value', 50),
        defaultValue: number('Add Default Value', 30),
        className: text('Add Classes', ''),
        onRange: action('👊Value of Range')
      }
    };
  }, {
      notes: progressMarkdown
  })
  .add('days', () => {
    return {
      component: ProgressComponent,
      props: {
        type: radios('type', {
          'days': 'days',
        }, 'days'),
        minValue: number('Add Min Value', 1),
        maxValue: number('Add Max Value', 30),
        defaultValue: number('Add Default Value', 6),
        className: text('Add Classes', ''),
        onDaysRange: action('👊Value of Range')
      }
    };
  }, {
    notes: progressMarkdown
  })
  .add('amount', () => {
    return {
      component: ProgressComponent,
      props: {
        type: radios('type', {
          'amount': 'amount',
        }, 'amount'),
        minValue: number('Add Min Value', 0),
        maxValue: number('Add Max Value', 30),
        defaultValue: number('Add Default Value', 0),
        className: text('Add Classes', ''),
        onAmountRange: action('👊Value of Range')
      }
    };
  }, {
    notes: progressMarkdown
  })
;
