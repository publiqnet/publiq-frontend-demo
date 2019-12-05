import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { UserSingleComponent } from '../../projects/ui-lib/src/lib/molecules/user-single/user-single.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
// @ts-ignore
import userSingleMarkdown from '../../projects/ui-lib/src/lib/molecules/user-single/user-single.component.notes.md';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { LottieComponent } from 'ngx-lottie';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';

storiesOf('Publiq Design|Molecules.User Single', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [
        LocalizedDatePipe,
        AvatarComponent,
        DropdownComponent,
        DropdownListComponent,
        TagMenuComponent,
        ChannelTypeMenuComponent,
        NotificationMenuComponent,
        ButtonComponent,
        ClickOutsideDirective,
        UserSingleComponent,
        InfiniteScrollDirective,
        LoaderComponent,
        LottieComponent,
        IconComponent,
        SafeHtmlPipe
      ],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('followers', () => {
    return {
      component: UserSingleComponent,
      props: {
        type: radios('Type', {
          'followers': 'followers',
        }, 'followers'),
        userData: object('User data', {
          user: {
            image: 'http://via.placeholder.com/120x120',
            first_name: 'John',
            last_name: 'Doe',
            slug: '1.0.2',
          },
          isFollowing: boolean('Is Followed', false),
          description: 'Founder at AllTopStartups | Author | Creator of Thinking in Models and Kaizen Habits | Featured at Inc. Magazine, Business Insider, Forbes, Entrepreneur, etc.',
          slug: text('Slug', 'user_data')
        }),
        showFollowButton: boolean('showFollowButton', true),
        className: text('Add Class', ''),
        onFollowChange: action('Follow Change Event'),
        onUserClick: action('User Info')
      },
    };
  }, {
      notes: userSingleMarkdown
  })
  .add('two-actions', () => {
    return {
      component: UserSingleComponent,
      props: {
        type: radios('Type', {
          'two-actions': 'two-actions',
        }, 'two-actions'),
        userData: object('User data', {
          user: {
            image: 'http://via.placeholder.com/120x120',
            first_name: 'John',
            last_name: 'Doe',
            slug: '1.0.2',
          },
          isFollowing: false,
          slug: 'user_data'
        }),
        primaryButtonText: text('Primary button text', 'Confirm'),
        secondaryButtonText: text('Secondary button text', 'Cancel'),
        className: text('Add Class', ''),
        onPrimaryClicked: action('Primary button clicked'),
        onSecondaryClicked: action('Secondary button clicked'),
        onUserClick: action('User Info')
      },
    };
  }, {
      notes: userSingleMarkdown
  })
  // .add('role', () => {
  //   return {
  //     component: UserSingleComponent,
  //     props: {
  //       type: radios('Type', {
  //         'role': 'role',
  //       }, 'role'),
  //       userData: object('User data', {
  //         user: {image: 'http://via.placeholder.com/120x120', first_name: 'John', last_name: 'Doe'},
  //         isFollowing: boolean('Is Followed', false),
  //         slug: text('Slug', 'user_data')
  //       }),
  //       userRoleData: object('User Roles data', [
  //         {
  //           value: 'Editor',
  //           slug: 'editor',
  //           status: true,
  //         },
  //         {
  //           value: 'Contributor',
  //           slug: 'contributor',
  //           status: false,
  //         }
  //       ]),
  //       addClasses: text('Add Class', ''),
  //       onFollowChange: action('Follow Change Event'),
  //       onUserClick: action('User Info'),
  //       onRoleClick: action('Dropdown Data')
  //     },
  //   };
  // })
  .add('notification', () => {
    return {
      component: UserSingleComponent,
      props: {
        type: radios('Type', {
          'notification': 'notification',
        }, 'notification'),
        isOwner: boolean('Is Owner', false),
        userData: object('User data', {
          user: {
            image: 'http://via.placeholder.com/120x120',
            first_name: 'John',
            last_name: 'Doe',
            slug: '1.0.2',
          },
          isFollowing: false,
          followMember: true,
          slug: text('Slug', 'user_data')
        }),
        userNotificationData: object('User Notification data', [{
          text: 'Delete from publication',
          value: 'delete',
        }
        ]),
        userRoleData: object('User Roles data', [
          {
            value: 'Editor',
            slug: 'editor',
            status: false,
          },
          {
            value: 'Contributor',
            slug: 'contributor',
            status: true,
          }
        ]),
        showFollowButton: boolean('showFollowButton', true),
        hasEditPermission: boolean('Has Edit Permissions', true),
        className: text('Add Class', ''),
        onFollowChange: action('Follow Change Event'),
        onUserClick: action('User Info'),
        onRoleClick: action('Dropdown Data'),
        onNotificationClick: action('Notification Data'),
        follow: action('follow clicked event'),
      },
    };
  }, {
      notes: userSingleMarkdown
  });
