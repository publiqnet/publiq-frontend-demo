import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { PublicationBlockComponent } from '../../projects/ui-lib/src/lib/molecules/publication-block/publication-block.component';
import { PublicationSingleComponent } from '../../projects/ui-lib/src/lib/molecules/publication-single/publication-single.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
import { PublicationMembersComponent } from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component';
// @ts-ignore
import publicationBlockMarkdown from '../../projects/ui-lib/src/lib/molecules/publication-block/publication-block.component.notes.md';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';

storiesOf('Publiq Design|Molecules.Publication Block', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [PublicationSingleComponent, AvatarComponent, DatumComponent, PublicationMembersComponent, ButtonComponent, PublicationBlockComponent, IconComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: PublicationBlockComponent,
      props: {
        hasMore: boolean('Has More Publications', false),
        countByPage: number('Publications count by page', 4),
        data: object('publication data', [
          {
            title: 'UX Topics 1',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: '',
            cover: '',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: true,
            status: 0
          },
          {
            title: 'UX Topics 2',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: '',
            cover: '',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: true,
            status: 0
          },
          {
            title: 'UX Topics 3',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 4',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 5',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 6',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 7',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 8',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 9',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 10',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 11',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          },
          {
            title: 'UX Topics 12',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: 'http://via.placeholder.com/120x120',
            cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: false,
            status: 0
          }
        ]),
        getPublication: action('Publication clicked'),
        onFollow: action('Followed'),
        loadMore: action('👊On Load More Publications Click')
      }
    };
  }, {
      notes: publicationBlockMarkdown
  });
