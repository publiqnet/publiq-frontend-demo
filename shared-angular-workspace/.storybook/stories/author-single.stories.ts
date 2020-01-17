import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
// @ts-ignore
import authorSingleMarkdown from '../../projects/ui-lib/src/lib/molecules/author-block/author-block.component.notes.md';
import { AuthorSingleComponent } from '../../projects/ui-lib/src/lib/molecules/author-single/author-single.component';


storiesOf('Publiq Design|Molecules.Author Single', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [AuthorSingleComponent, AvatarComponent, DatumComponent, ButtonComponent, IconComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: AuthorSingleComponent,
      props: {
        authorData: object('author data', {
            first_name: 'John',
            last_name: 'Doe',
            fullName: 'John Doe',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
        ),
        className: text('Add Class', ''),
        getAuthorKey: action('Author clicked'),
        follow: action('follow clicked event'),
      }
    };
  }, {
    notes: authorSingleMarkdown
  });
