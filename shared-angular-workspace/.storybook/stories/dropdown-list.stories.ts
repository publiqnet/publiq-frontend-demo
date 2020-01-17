import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number, radios, boolean, object } from '@storybook/addon-knobs';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
// @ts-ignore
import dropdownListMarkdown from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component.notes.md';
import { NotificationCardComponent } from '../../projects/ui-lib/src/lib/molecules/molecules.module';
import { ViewCountComponent } from '../../projects/ui-lib/src/lib/molecules/view-count/view-count.component';
import { WelcomeMessageComponent } from '../../projects/ui-lib/src/lib/molecules/welcome-message/welcome-message.component';
import { TabberComponent } from '../../projects/ui-lib/src/lib/molecules/tabber/tabber.component';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { ProgressComponent } from '../../projects/ui-lib/src/lib/molecules/progress/progress.component';
import { PublicationSingleComponent } from '../../projects/ui-lib/src/lib/molecules/publication-single/publication-single.component';
import { ImageUploadComponent } from '../../projects/ui-lib/src/lib/molecules/image-upload/image-upload.component';
import { UserSingleComponent } from '../../projects/ui-lib/src/lib/molecules/user-single/user-single.component';
import { ChipComponent } from '../../projects/ui-lib/src/lib/molecules/chip/chip.component';
import { InputSuggestionsComponent } from '../../projects/ui-lib/src/lib/molecules/input-suggestions/input-suggestions.component';
import { ContentSingleComponent } from '../../projects/ui-lib/src/lib/molecules/content-single/content-single.component';
import { PublicationBlockComponent } from '../../projects/ui-lib/src/lib/molecules/publication-block/publication-block.component';
import { PublicationMembersComponent } from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component';
import { DraftComponent } from '../../projects/ui-lib/src/lib/molecules/draft/draft.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { InputComponent } from '../../projects/ui-lib/src/lib/atoms/input/input.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { LottieComponent, LottieModule } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';

storiesOf('Publiq Design|Molecules.Dropdown List', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}),],
      declarations: [
        LocalizedDatePipe,
        AvatarComponent,
        TagMenuComponent,
        ChannelTypeMenuComponent,
        ClickOutsideDirective,
        ViewCountComponent,
        InputComponent,
        ButtonComponent,
        WelcomeMessageComponent,
        TabberComponent,
        DatumComponent,
        ProgressComponent,
        PublicationSingleComponent,
        ImageUploadComponent,
        UserSingleComponent,
        ChipComponent,
        InputSuggestionsComponent,
        ContentSingleComponent,
        PublicationBlockComponent,
        PublicationMembersComponent,
        DraftComponent,
        NotificationCardComponent,
        InfiniteScrollDirective,
        NotificationMenuComponent,
        DropdownComponent,
        DropdownListComponent,
        // LottieComponent,
        LoaderComponent,
        SafeHtmlPipe,
        IconComponent
      ],
      providers: [UtilService],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('Type', {
          'Default': 'default',
        }, 'default'),
        isOpen: boolean('Is open?', true),
        delta: number('delta', 0),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'right'),
        icon: text('Icon', 'profile'),
        items: object('Items', [
          {
            'icon': 'reposition',
            'text': 'Reposition',
            'value': 'reposition'
          },
          {
            'icon': 'delete',
            'text': 'Delete',
            'value': 'delete',
            'seperator': true
          },
          {
            'icon': 'hidden',
            'text': 'Hide Cover',
            'value': 'hide-cover'
          }
        ]),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        shadowed: boolean('shadowed', false),
        isDark: boolean('Is dark?', false),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
      notes: dropdownListMarkdown
  })
  .add('header avatar dropdown', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('Type', {
          'Default': 'default'
        }, 'default'),
        isOpen: boolean('Is open?', false),
        delta: number('delta', 15),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'bottom'),
        icon: text('Icon', 'profile'),
        shadowed: boolean('shadowed', false),
        items: object('Items', [
          {
            'icon': 'pbq',
            'text': '2000 PBQ',
            'value': 'new-story',
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
            'icon': 'my-story',
            'text': 'My stories',
            'value': 'my-stories',
            'seperator': true
          },
          {
            'icon': 'publication',
            'text': 'Publications',
            'value': 'publications',
            'seperator': true
          },
          {
            'icon': 'profile',
            'text': 'Profile',
            'value': 'profile',
            'className': 'silly'
          },
          {
            'icon': 'logout',
            'text': 'Log Out',
            'value': 'logout'
          },
        ]),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
      notes: dropdownListMarkdown
  })
  .add('tag-menu', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('type', {
          'Tag menu': 'tag-menu',
        }, 'tag-menu'),
        isOpen: boolean('Is open?', false),
        delta: number('delta', 105),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'bottom'),
        icon: text('Icon', 'menu'),
        items: object('Items', [
          { text: 'Science', slug: 'science' },
          { text: 'History', slug: 'history' },
          { text: 'Geek', slug: 'geek' },
          { text: 'Gardens', slug: 'gardens' },
          { text: 'Entertainment', slug: 'entertainment' },
          { text: 'Education', slug: 'education' },
          { text: 'Outdoors', slug: 'outdoors' },
          { text: 'Quotes', slug: 'quotes' },
          { text: 'Holy Quraan', slug: 'quraan' },
        ]),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        shadowed: boolean('shadowed', false),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
      notes: dropdownListMarkdown
  })
  .add('publication-dropdown', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('type', {
          'Publication Dropdown': 'publication-dropdown',
        }, 'publication-dropdown'),
        isOpen: boolean('Is open?', false),
        delta: number('delta', 35),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'bottom'),
        icon: text('Icon', 'energy'),
        items: object('Items', [
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
        ]),
        optionsData: object('Option Data', [{
          value: 'test-value-1',
          text: 'Test text 1',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News 1'},
        },
          {
            value: 'test-value-2',
            text: 'Test text 2',
            metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News 2'},
          }]),
        publicationList:  object('publications List', [{
          title: 'Test text 1',
          slug: 'test-value-1',
          image: 'http://via.placeholder.com/120x120'
        }]),
        shadowed: boolean('shadowed', false),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
    notes: dropdownListMarkdown
  })
  .add('notification-list', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('type', {
          'Notification': 'notification-list',
        }, 'notification-list'),
        isOpen: boolean('Is open?', true),
        delta: number('delta', 35),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'right'),
        icon: text('Icon', 'energy'),
        items: object('Items', [
          {
            type: 'share_article',
            slug: '1.3.8',
            date: new Date(),
            langOptions: {
              bodyEn: '{{performer}} has invited you to join {{target}}',
              bodyJp: '{{performer}}に参加するように招待されています{{target}}'
            },
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
            type: 'publication_invitation_new',
            slug: '1.3.8',
            date: new Date(),
            langOptions: {
              bodyEn: '{{performer}} has invited you to join {{target}}',
              bodyJp: '{{performer}}に参加するように招待されています{{target}}'
            },
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
            type: 'publication_invitation_new',
            slug: '1.3.8',
            date: new Date(),
            langOptions: {
              bodyEn: '{{performer}} has invited you to join {{target}}',
              bodyJp: '{{performer}}に参加するように招待されています{{target}}'
            },
            isRead: true,
            actionFrom: {
              image: 'http://via.placeholder.com/150',
              first_name: 'Harutyun',
              last_name: 'Mnatsakanyan',
              slug: '4.3.2'
            },
            publication: {
              title: 'Lorem Ipsum',
              slug: '123ab6'
            }
          },
          {
            type: 'publication_invitation_new',
            slug: '1.3.8',
            date: new Date(),
            langOptions: {
              bodyEn: '{{performer}} has invited you to join {{target}}',
              bodyJp: '{{performer}}に参加するように招待されています{{target}}'
            },
            isRead: true,
            actionFrom: {
              image: 'http://via.placeholder.com/150',
              first_name: 'Harutyun',
              last_name: 'Mnatsakanyan',
              slug: '4.3.2'
            },
            publication: {
              title: 'Lorem Ipsum',
              slug: '123ab6'
            }
          }
        ]),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        shadowed: boolean('shadowed', false),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
      notes: dropdownListMarkdown
  })
  .add('social-menu', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('type', {
          'Social Menu': 'social-menu',
        }, 'social-menu'),
        isOpen: boolean('Is open?', false),
        delta: number('delta', 35),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'bottom'),
        icon: text('Icon', 'menu'),
        shadowed: boolean('shadowed', true),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        articleShared: action('Article Shared'),
      }
    };
  }, {
    notes: dropdownListMarkdown
  })
  .add('channel-type', () => {
    return {
      component: DropdownListComponent,
      props: {
        type: radios('dogh', {
          'Channel Type': 'channel-type',
        }, 'channel-type'),
        isOpen: boolean('Is open?', false),
        delta: number('delta', 0),
        position: radios('position', {
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left',
        }, 'bottom'),
        optionsData: object('Option Data', [{
          value: 'test-value',
          text: 'Test text',
          metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test', last_name: 'News'},
        }]),
        shadowed: boolean('shadowed', false),
        icon: text('Icon', 'menu'),
        isChannelPrivate: boolean('Is channel private?', true),
        listClassName: text('listClassName', ''),
        openerClassName: text('openerClassName', ''),
        onItemSelect: action('onItemSelect'),
      }
    };
  }, {
      notes: dropdownListMarkdown
  });
