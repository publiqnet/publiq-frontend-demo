import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RelevantContentComponent } from '../../projects/ui-lib/src/lib/organism/relevant-content/relevant-content.component';
import { ContentSingleComponent } from '../../projects/ui-lib/src/lib/molecules/content-single/content-single.component';
// @ts-ignore
import relevantContentMarkdown from '../../projects/ui-lib/src/lib/organism/relevant-content/relevant-content.component.notes.md';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LottieComponent } from 'ngx-lottie';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';

const contentArray = [];

for (let i = 0; i < 5; ++i) {
  contentArray.push({
    'slug': '5ceb9fc82765246c6cc55b47',
    'author': {
      'slug': '1.0.2',
      'first_name': 'Gohar',
      'last_name': 'Avetisyan',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK',
      'thumbnail': 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/TPBQ7iKZHeFwcwHwTAufW4E99nPYVXf7rKsCSSTfhkFe6igQk6ERed-thumbnail.jpg'
    },
    'created': '11 dec 2019',
    'published': '12 dec 2019',
    'title': 'In the flesh: translating 2d scans into 3d prints NO' + (i + 1),
    'tags': [
      '2017',
      'DEVELOPER',
      'FULLSTACK'
    ],
    cover: {
      mimeType: 'image/jpeg',
      size: 66110,
      thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
      uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
      url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
      thumbnailWidth: 300,
      thumbnailHeight: 257
    },
    'publication': {
      'title': 'UX Planet',
      'slug': 'ux_planet'
    },
    'view_count': '1K'
  });
}


storiesOf('Publiq Design|Organisms.Relevant Content', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [
        LocalizedDatePipe,
        ContentSingleComponent,
        AvatarComponent,
        DropdownComponent,
        DropdownListComponent,
        ButtonComponent,
        RelevantContentComponent,
        SafeHtmlPipe,
        NotificationMenuComponent,
        ChannelTypeMenuComponent,
        TagMenuComponent,
        LoaderComponent,
        InfiniteScrollDirective,
        LottieComponent,
        IconComponent
      ],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('one-grid', () => {
    return {
      component: RelevantContentComponent,
      props: {
        type: radios('Grid type', {
          'one-grid': 'one-grid'
        }, 'one-grid'),
        title: text('Title', 'Interesting Writers'),
        contentList: object('Content array', contentArray),
        titleClassName: text('Title class name', ''),
        itemsClassName: text('Items class name', ''),
        publicationClick: action('Publication clicked.'),
        contentClick: action('Content clicked.'),
        accountClick: action('Account clicked.'),
        tagClick: action('Tag clicked.'),
        titleClick: action('Title clicked.'),
        likeClick: action('Like clicked.')
      }
    };
  }, {
    notes: relevantContentMarkdown
  })
  .add('all-single', () => {
    return {
      component: RelevantContentComponent,
      props: {
        type: radios('Grid type', {
          'all-single' : 'all-single'
        }, 'all-single'),
        title: text('Title', 'Interesting Writers'),
        contentList: object('Content array', contentArray),
        titleClassName: text('Title class name', ''),
        itemsClassName: text('Items class name', ''),
        publicationClick: action('Publication clicked.'),
        contentClick: action('Content clicked.'),
        accountClick: action('Account clicked.'),
        tagClick: action('Tag clicked.'),
        titleClick: action('Title clicked.')
      }
    };
  }, {
    notes: relevantContentMarkdown
  });
