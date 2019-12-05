import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, radios, text } from '@storybook/addon-knobs';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
// @ts-ignore
import avatarMarkdown from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.Avatar', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [AvatarComponent],
      providers: [UtilService],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: AvatarComponent,
      props: {
        avatarData: object('avatar data', {
          fullName: 'Sarkis Andreyan',
          thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
          image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg'
        }),
        isSquaric: boolean('is squaric', false),
        loadOriginalImg: boolean('loadOriginalImg', true),
        size: radios('size', {
          'X-small': 'xsmall',
          'X-smallPublication': 'xsmallPublication',
          'Medium': 'medium',
          'Medium Publication': 'mediumPublication',
          'Large': 'large'
        }, 'medium'),
        className: text('Add class')
      }
    };
  }, {
      notes: avatarMarkdown
  });

