import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { HeaderComponent } from '../../projects/ui-lib/src/lib/organism/header/header.component';
// @ts-ignore
import headerMarkdown from '../../projects/ui-lib/src/lib/organism/header/header.component.notes.md';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';

storiesOf('Publiq Design|Organisms.Header', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [
        LocalizedDatePipe,
        AvatarComponent,
        DropdownListComponent,
        TagMenuComponent,
        DatumComponent,
        ButtonComponent,
        ChannelTypeMenuComponent,
        InfiniteScrollDirective,
        NotificationMenuComponent,
        LoaderComponent,
        HeaderComponent,
        ClickOutsideDirective,
        DropdownComponent,
        IconComponent,
        SafeHtmlPipe
      ],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: HeaderComponent,
      props: {
        currentRout: '/',
        showSearchBar: boolean('Show Search Bar', false),
        isSecondActive: boolean('isSecondActive', false),
        articlePage: boolean('isArticlePage', false),
        headerData: object('Header Data', {
          logo: 'https://stage-file.publiq.network/default/publiq.svg',
          isLogged: true,
          newNotificationsCount: 0,
          notificationData: [
            {
              type: 'new_article',
              slug: '1.3.8',
              date: new Date(),
              isRead: false,
              actionFrom: {
                image: 'http://via.placeholder.com/150',
                first_name: 'Gagik',
                last_name: 'Yeghiazaryan',
                slug: '4.3.2'
              },
              publication: {
                title: 'Lorem Ipsum',
                slug: '123ab6'
              }
            },
            {
              type: 'publication_membership_cancelled_by_user',
              slug: '1.3.8',
              date: new Date(),
              isRead: false,
              actionFrom: {
                image: 'http://via.placeholder.com/150',
                first_name: 'Gagik',
                last_name: 'Yeghiazaryan',
                slug: '4.3.2'
              },
              publication: {
                title: 'Lorem Ipsum',
                slug: '123ab6'
              }
            },
            {
              type: 'following',
              slug: '1.3.8',
              date: new Date(),
              isRead: true,
              actionFrom: {
                image: 'http://via.placeholder.com/150',
                first_name: 'Harutyun',
                last_name: 'Mnatsakanyan',
                slug: '4.3.2'
              }
            }
          ],
          // userData: {
          //   user: {
          //     fullName: 'Sarkis Andreyan',
          //     image: 'http://via.placeholder.com/120x120',
          //   },
          //   info: [
          //     {count: '11', property: 'Stories', icon: 'profile'},
          //     {count: '12', property: 'Views'},
          //     {count: '13', property: 'Members'},
          //     {count: '1K', property: 'Followers'},
          //   ]
          // },
          userLoggedData: [
            {
              'icon': 'pbq',
              'text': '2000 PBQ',
              'value': 'wallet',
              'inner': {
                'text': 'Wallet',
                'icon': 'arrow-right'
              },
              'seperator': true
            },
            {
              'icon': 'new-story',
              'text': 'New story',
              'value': 'new-story'
            },
            {
              'icon': 'profile',
              'text': 'Profile',
              'value': 'profile',
              'className': 'silly',
              'seperator': true
            },
            // {
            //   'icon': 'my-story',
            //   'text': 'My stories',
            //   'value': 'my-stories',
            //   'seperator': true
            // },
            {
              'icon': 'publication',
              'text': 'Publications',
              'value': 'publications'
            },
            {
              'icon': 'logout',
              'text': 'Log Out',
              'value': 'logout',
              'seperator': true
            },
            {
              'text': ' © PUBLIQ',
              'className': 'inline-items language-title',
              'value': '',
            },
            {
              'text': 'EN',
              'value': 'en',
              'className': 'inline-items language-switcher',
            },
            {
              'text': 'JP',
              'value': 'jp',
              'className': 'inline-items language-switcher selected',
            },
          ],
          // publicationData: {
          //   title: 'Publication Title',
          //   slug: 'publication',
          //   logo: 'http://via.placeholder.com/120x120',
          //   isFollowed: boolean('is followed', false),
          //   views: 0,
          //   subscribersCount: 1234,
          //   storiesCount: 0,
          //   memberStatus: 1,
          //   membersList: [
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 1',
          //       last_name: 'A',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     },
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 2',
          //       last_name: 'B',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     },
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 3',
          //       last_name: 'C',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     },
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 4',
          //       last_name: 'D',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     },
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 5',
          //       last_name: 'E',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     },
          //     {
          //       slug: '1.0.2',
          //       first_name: 'test 6',
          //       last_name: 'G',
          //       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
          //     }
          //   ]
          // },
          articleData: {
            user: object('avatar data', {
              fullName: '',
              image: 'http://via.placeholder.com/120x120',
              public_key: 'PBQ6zSTV5uDutfesxRGtnMDKof4FiM49hrjCLA5Ua42krjJTSoEhE',
            }),
            title: 'Article Title',
            slug: 'article',
            isLiked: boolean('Is Liked', false),
            isFollowed: false
          },
          draftData: {
            updated: 1563889376,
          }
        }),
        tagItems: object('tagItems', [
          { text: 'Science', slug: 'science' },
          { text: 'History', slug: 'history' },
          { text: 'Geek', slug: 'geek' },
          { text: 'Gardens', slug: 'gardens' },
          { text: 'Entertainment', slug: 'entertainment' },
          { text: 'Education', slug: 'education' },
          { text: 'Outdoors', slug: 'outdoors' },
          { text: 'Quotes', slug: 'quotes' },
          { text: 'Science', slug: 'science' },
          { text: 'History', slug: 'history' },
          { text: 'Geek', slug: 'geek' },
          { text: 'Gardens', slug: 'gardens' },
          { text: 'Entertainment', slug: 'entertainment' },
          { text: 'Education', slug: 'education' },
          { text: 'Outdoors', slug: 'outdoors' },
          { text: 'Quotes', slug: 'quotes' },
          { text: 'Science', slug: 'science' },
          { text: 'History', slug: 'history' },
          { text: 'Geek', slug: 'geek' },
          { text: 'Gardens', slug: 'gardens' },
          { text: 'Entertainment', slug: 'entertainment' },
          { text: 'Education', slug: 'education' },
          { text: 'Outdoors', slug: 'outdoors' },
          { text: 'Quotes', slug: 'quotes' },
        ]),
        className: text('Add Class', ''),
        navigationLink: action('Navigation Slug'),
        searchEvent: action('Search Button Clicked'),
        publicationFollow: action('Publication Followed'),
        continueArticle: action('Continue Later'),
        articleLiked: action('Article Liked'),
        articleFollow: action('Article Author Follow Status'),
        articleShared: action('Article Shared'),
        publishArticleClick: action('Article Publish Click'),
        notificationMenuOpened: action('Notification menu opened'),
        userFollow: action('User Followed'),
        userSignIn: action('User Sign In'),
        articleReadPercent: number('articleReadPercent', 0),
        onTagItemSelect: action('Tag Item Clicked'),
        userSignUp: action('User Sign Up'),
        articleTitleClick: action('Title Clicked'),
        publicationTitleClick: action('Title Clicked'),
        onInputChange: action('Search Input Change Event'),
      }
    };
  }, {
    notes: headerMarkdown
  });
