import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { PublicationSingleComponent } from '../../projects/ui-lib/src/lib/molecules/publication-single/publication-single.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { PublicationMembersComponent } from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
// @ts-ignore
import publicationSingleMarkdown from '../../projects/ui-lib/src/lib/molecules/publication-single/publication-single.component.notes.md';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LottieComponent, LottieModule } from 'ngx-lottie';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';


storiesOf('Publiq Design|Molecules.Publication Single', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [
        LocalizedDatePipe,
        AvatarComponent,
        PublicationMembersComponent,
        DatumComponent,
        ButtonComponent,
        DropdownListComponent,
        DropdownComponent,
        TagMenuComponent,
        ChannelTypeMenuComponent,
        NotificationMenuComponent,
        InfiniteScrollDirective,
        LoaderComponent,
        SafeHtmlPipe,
        IconComponent,
        PublicationSingleComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('follow', () => {
    return {
      component: PublicationSingleComponent,
      props: {
        type: radios('type', {
          'follow': 'follow',
        }, 'follow'),
        isOwner: boolean('is owner', false),
        publicationData: object('publication data', {
          title: 'UX Topics',
          description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
          logo: 'http://via.placeholder.com/120x120',
          cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          slug: 'ux_topics',
          subscribersCount: 1234,
          following: boolean('is followed', false),
          inviter: {
            name: 'Anechka'
          },
          status: 0,
          storiesCount: 0,
          membersList: [
            {
              slug: '1.0.2',
              first_name: 'test 1',
              last_name: 'A',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 2',
              last_name: 'B',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 3',
              last_name: 'C',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 4',
              last_name: 'D',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 5',
              last_name: 'E',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 6',
              last_name: 'G',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            }
          ]
        }),
        className: text('Add Class', ''),
        follow: action('follow clicked event'),
        invitationAnswer: action('clicked reject or accept'),
        getPublicationSlug: action('Publication clicked'),
        getSelectedMember: action('member clicked')
      },
    };
  }, {
      notes: publicationSingleMarkdown
  })
  .add('invitation', () => {
    return {
      component: PublicationSingleComponent,
      props: {
        type: radios('type', {
          'invitation': 'invitation',
        }, 'invitation'),
        publicationData: object('publication data', {
          title: 'UX Topics',
          description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
          logo: 'http://via.placeholder.com/120x120',
          cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          slug: 'ux_topics',
          subscribersCount: 1234,
          following: boolean('is followed', false),
          inviter: {
            fullName: 'Anechka',
            publicKey: 'test_public_key'
          },
          status: 0,
          storiesCount: 0,
          membersList: [
            {
              slug: '1.0.2',
              first_name: 'test 1',
              last_name: 'A',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 2',
              last_name: 'B',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 3',
              last_name: 'C',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 4',
              last_name: 'D',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 5',
              last_name: 'E',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 6',
              last_name: 'G',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            }
          ]
        }),
        className: text('Add Class', ''),
        follow: action('follow clicked event'),
        invitationAnswer: action('clicked reject or accept'),
        getPublicationSlug: action('Publication clicked'),
        getSelectedMember: action('member clicked')
      },
    };
  }, {
      notes: publicationSingleMarkdown
  })
  .add('list', () => {
    return {
      component: PublicationSingleComponent,
      props: {
        type: radios('type', {
          'list': 'list',
        }, 'list'),
        publicationData: object('publication data', {
          title: 'UX Topics',
          description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
          logo: 'http://via.placeholder.com/120x120',
          cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          slug: 'ux_topics',
          subscribersCount: 1234,
          following: boolean('is followed', false),
          inviter: {
            name: 'Anechka'
          },
          status: 0,
          storiesCount: 0,
          membersCount: 1,
          membersList: [
            {
              slug: '1.0.2',
              first_name: 'test 1',
              last_name: 'A',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 2',
              last_name: 'B',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 3',
              last_name: 'C',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 4',
              last_name: 'D',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 5',
              last_name: 'E',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 6',
              last_name: 'G',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            }
          ]
        }),
        className: text('Add Class', ''),
        follow: action('follow clicked event'),
        invitationAnswer: action('clicked reject or accept'),
        getPublicationSlug: action('Publication clicked'),
        getSelectedMember: action('member clicked')
      },
    };
  }, {
      notes: publicationSingleMarkdown
  })
  .add('staff', () => {
    return {
      component: PublicationSingleComponent,
      props: {
        type: radios('type', {
          'staff': 'staff',
        }, 'staff'),
        publicationData: object('publication data', {
          title: 'UX Topics',
          description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
          logo: 'http://via.placeholder.com/120x120',
          cover: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          slug: 'ux_topics',
          subscribersCount: 1234,
          following: boolean('Is followed', false),
          hideCover: false,
          inviter: {
            name: 'Anechka'
          },
          status: 1,
          storiesCount: 0,
          membersList: [
            {
              slug: '1.0.2',
              first_name: 'test 1',
              last_name: 'A',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 2',
              last_name: 'B',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 3',
              last_name: 'C',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 4',
              last_name: 'D',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 5',
              last_name: 'E',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            {
              slug: '1.0.2',
              first_name: 'test 6',
              last_name: 'G',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            }
          ]
        }),
        userNotificationData: object('User Notification data', [
        {
          text: 'Delete publication',
          value: 'delete',
        },
        {
          text: 'Leave publication',
          value: 'leave',
        }
        ]),
        className: text('Add Class', ''),
        follow: action('follow clicked event'),
        invitationAnswer: action('clicked reject or accept'),
        getPublicationSlug: action('Publication clicked'),
        getSelectedMember: action('member clicked'),
        onNotificationClick: action('Delete Click'),
      },
    };
  }, {
      notes: publicationSingleMarkdown
  });
