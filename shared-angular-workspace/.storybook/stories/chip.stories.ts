import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ChipComponent } from '../../projects/ui-lib/src/lib/molecules/chip/chip.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
// @ts-ignore
import chipMarkdown from '../../projects/ui-lib/src/lib/molecules/chip/chip.component.notes.md';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { TranslateModule } from '@ngx-translate/core';


storiesOf('Publiq Design|Atoms.Chip', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [AvatarComponent, ChipComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('with avatar', () => {
    return {
      component: ChipComponent,
      props: {
        text: text('Text', 'Poghos Petrosyan'),
        removeButton: boolean('removeButton', true),
        avatarData: object('avatarData', {
          image: 'http://via.placeholder.com/100x100',
          first_name: 'Poghos',
          last_name: 'Petrosyan'
        }),
        className: text('className', ''),
        onRemove: action('onRemove')
      },
    };
  }, {
      notes: chipMarkdown
  })
  .add('without avatar', () => {
    return {
      component: ChipComponent,
      props: {
        text: text('Text', 'Poghos Petrosyan'),
        removeButton: boolean('removeButton', true),
        className: text('className', ''),
        onRemove: action('onRemove')
      },
    };
  }, {
      notes: chipMarkdown
  });
