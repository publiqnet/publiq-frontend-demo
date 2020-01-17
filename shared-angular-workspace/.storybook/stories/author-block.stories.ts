import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, number, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
import { AuthorBlockComponent } from '../../projects/ui-lib/src/lib/molecules/author-block/author-block.component';
import { AuthorSingleComponent } from '../../projects/ui-lib/src/lib/molecules/author-single/author-single.component';
// @ts-ignore
import authorBlockMarkdown from '../../projects/ui-lib/src/lib/molecules/author-block/author-block.component.notes.md';



storiesOf('Publiq Design|Molecules.Author Block', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [AuthorBlockComponent, AvatarComponent, DatumComponent, ButtonComponent, IconComponent, AuthorSingleComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('Top Authors', () => {
    return {
      component: AuthorBlockComponent,
      props: {
        hasMore: boolean('Has More Authors', false),
        countByPage: number('Authors count by page', 4),
        type: radios('type', {
          Top: 'top'
        }, 'top'),
        data: object('author data', [
          {
            first_name: 'John',
            last_name: 'Doe 1',
            fullName: 'John Doe 1',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 2',
            fullName: 'John Doe 2',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 3',
            fullName: 'John Doe 3',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 4',
            fullName: 'John Doe 4',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 5',
            fullName: 'John Doe 5',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 6',
            fullName: 'John Doe 6',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 7',
            fullName: 'John Doe 7',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 8',
            fullName: 'John Doe 8',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 9',
            fullName: 'John Doe 9',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: true,
          },
          {
            first_name: 'John',
            last_name: 'Doe 10',
            fullName: 'John Doe 10',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 11',
            fullName: 'John Doe 11',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 12',
            fullName: 'John Doe 12',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          }
        ]),
        getAuthor: action('Author clicked'),
        onFollow: action('Followed'),
        loadMore: action('👊On Load More Authors Click')
      }
    };
  }, {
    notes: authorBlockMarkdown
  })
  .add('Trending Authors', () => {
    return {
      component: AuthorBlockComponent,
      props: {
        hasMore: boolean('Has More Authors', false),
        countByPage: number('Authors count by page', 4),
        type: radios('type', {
          Trending: 'trending'
        }, 'trending'),
        data: object('author data', [
          {
            first_name: 'John',
            last_name: 'Doe 1',
            fullName: 'John Doe 1',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 2',
            fullName: 'John Doe 2',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 3',
            fullName: 'John Doe 3',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 4',
            fullName: 'John Doe 4',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 5',
            fullName: 'John Doe 5',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 6',
            fullName: 'John Doe 6',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 7',
            fullName: 'John Doe 7',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 8',
            fullName: 'John Doe 8',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 9',
            fullName: 'John Doe 9',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 10',
            fullName: 'John Doe 10',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 11',
            fullName: 'John Doe 11',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          },
          {
            first_name: 'John',
            last_name: 'Doe 12',
            fullName: 'John Doe 12',
            bio: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
            image: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg',
            subscribersCount: 1234,
            slug: '1234567890qwertyuiopasdfghjkl',
            subscribed: false,
          }
        ]),
        getAuthor: action('Author clicked'),
        onFollow: action('Followed'),
        loadMore: action('👊On Load More Authors Click')
      }
    };
  }, {
    notes: authorBlockMarkdown
  });
