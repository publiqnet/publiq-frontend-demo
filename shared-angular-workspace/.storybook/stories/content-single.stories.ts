import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, radios, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ContentSingleComponent } from '../../projects/ui-lib/src/lib/molecules/content-single/content-single.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { ViewCountComponent } from '../../projects/ui-lib/src/lib/molecules/view-count/view-count.component';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
// @ts-ignore
import contentSingleMarkdown from '../../projects/ui-lib/src/lib/molecules/content-single/content-single.component.notes.md';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { DropdownListComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown-list/dropdown-list.component';
import { TagMenuComponent } from '../../projects/ui-lib/src/lib/molecules/tag-menu/tag-menu.component';
import { ChannelTypeMenuComponent } from '../../projects/ui-lib/src/lib/molecules/channel-type-menu/channel-type-menu.component';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { LottieComponent } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { SafeHtmlPipe } from '../../projects/ui-lib/src/core/pipes/safeHtml.pipe';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';


storiesOf('Publiq Design|Molecules.Content Single', module)
    .addDecorator(
        moduleMetadata({
          imports: [TranslateModule.forRoot()],
          declarations: [
            AvatarComponent,
            ViewCountComponent,
            DropdownComponent,
            ButtonComponent,
            ClickOutsideDirective,
            DropdownListComponent,
            TagMenuComponent,
            ChannelTypeMenuComponent,
            NotificationMenuComponent,
            InfiniteScrollDirective,
            LoaderComponent,
            LottieComponent,
            ContentSingleComponent,
            SafeHtmlPipe,
            LocalizedDatePipe,
            IconComponent
          ],
          providers: [UtilService],
        })
    )
    .addDecorator(withKnobs)
    .add('related', () => {
        return {
            component: ContentSingleComponent,
            props: {
                type: radios('type', {
                    'related': 'related',
                }, 'related'),
                canEditContent: boolean('Can Edit?', true),
                loadOriginalImg: boolean('loadOriginalImg', true),
                contentData: object('Content data', {
                    uri: '5ceb9fc82765246c6cc55b47',
                    status: 'confirmed',
                    author: {
                        slug: '1.0.2',
                        first_name: 'Gohar',
                        last_name: 'Avetisyan',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
                    },
                    created: 1563889376,
                    published: 1563889376,
                    title: 'In the flesh: translating 2d scans into 3d prints',
                    tags: ['2017', 'DEVELOPER', 'FULLSTACK'],
                    cover: {
                      mimeType: 'image/jpeg',
                      size: 66110,
                      thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
                      uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
                      url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
                      thumbnailWidth: 300,
                      thumbnailHeight: 257
                    },
                    publication: {
                        title: 'UX Planet',
                        slug: 'ux_planet',
                        image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    },
                    boosted: false,
                    view_count: '1K',
                }),
                publicationList: object('Publications List', [
                  {
                    value: 'test-value-1',
                    text: 'Test text 1',
                    metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test title', last_name: 'News'}
                  },
                  {
                    value: 'test-value-2',
                    text: 'Test text 2',
                    metaData: {image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', first_name: 'Test title', last_name: 'News'}
                  },
                ]),
                className: text('Add Class', ''),
                publicationClick: action('publication clicked'),
                contentClick: action('content clicked'),
                accountClick: action('account clicked'),
                tagClick: action('tag clicked'),
                likeClick: action('Like clicked'),
                imageLoaded: action('image loaded'),
                onTagItemSelect: action('Selected Settings'),
                onPublicationSelect: action('Publication Selected'),
            },
        };
    }, {
        notes: contentSingleMarkdown
    })
    .add('single', () => {
      return {
        component: ContentSingleComponent,
        props: {
          type: radios('type', {
            'single': 'single'
          }, 'single'),
          canEditContent: boolean('Can Edit?', true),
          loadOriginalImg: boolean('loadOriginalImg', true),
          contentData: object('Content data', {
            uri: '5ceb9fc82765246c6cc55b47',
            author: {
              slug: '1.0.2',
              first_name: 'Gohar',
              last_name: 'Avetisyan',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            created: 1563889376,
            published: 1563889376,
            status: 'confirmed',
            title: 'In the flesh: translating 2d scans into 3d prints',
            tags: ['2017', 'DEVELOPER', 'FULLSTACK'],
            cover: {
              mimeType: 'image/jpeg',
              size: 66110,
              thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
              uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              thumbnailWidth: 300,
              thumbnailHeight: 257
            },
            publication: {
              title: 'UX Planet',
              slug: 'ux_planet',
              image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            boosted: false,
            view_count: '1K',
          }),
          publicationList: object('Publications List', [
            {
              value: 'test-value-1',
              text: 'Test text 1',
              metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test title', last_name: 'News'}
            },
            {
              value: 'test-value-2',
              text: 'Test text 2',
              metaData: {image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', first_name: 'Test title', last_name: 'News'}
            },
          ]),
          className: text('Add Class', ''),
          publicationClick: action('publication clicked'),
          contentClick: action('content clicked'),
          accountClick: action('account clicked'),
          tagClick: action('tag clicked'),
          likeClick: action('Like clicked'),
          imageLoaded: action('image loaded'),
          onTagItemSelect: action('Selected Settings'),
          onPublicationSelect: action('Publication Selected'),
        },
      };
    }, {
          notes: contentSingleMarkdown
    })
    .add('single-small', () => {
      return {
        component: ContentSingleComponent,
        props: {
          type: radios('type', {
            'single-small': 'single-small'
          }, 'single-small'),
          canEditContent: boolean('Can Edit?', true),
          loadOriginalImg: boolean('loadOriginalImg', true),
          contentData: object('Content data', {
            uri: '5ceb9fc82765246c6cc55b47',
            author: {
              slug: '1.0.2',
              first_name: 'Gohar',
              last_name: 'Avetisyan',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            created: 1563889376,
            published: 1563889376,
            status: 'confirmed',
            title: 'In the flesh: translating 2d scans into 3d prints',
            tags: ['2017', 'DEVELOPER', 'FULLSTACK'],
            cover: {
              mimeType: 'image/jpeg',
              size: 66110,
              thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
              uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              thumbnailWidth: 300,
              thumbnailHeight: 257
            },
            publication: {
              title: 'UX Planet',
              slug: 'ux_planet',
              image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            view_count: '1K',
          }),
          publicationList: object('Publications List', [
            {
              value: 'test-value-1',
              text: 'Test text 1',
              metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test title', last_name: 'News'}
            },
            {
              value: 'test-value-2',
              text: 'Test text 2',
              metaData: {image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', first_name: 'Test title', last_name: 'News'}
            },
          ]),
          className: text('Add Class', ''),
          publicationClick: action('publication clicked'),
          contentClick: action('content clicked'),
          accountClick: action('account clicked'),
          tagClick: action('tag clicked'),
          likeClick: action('Like clicked'),
          imageLoaded: action('image loaded'),
          onTagItemSelect: action('Selected Settings'),
          onPublicationSelect: action('Publication Selected'),
        },
      };
    }, {
          notes: contentSingleMarkdown
    })
    .add('grid', () => {
      return {
        component: ContentSingleComponent,
        props: {
          type: radios('type', {
            'grid': 'grid'
          }, 'grid'),
          canEditContent: boolean('Can Edit?', true),
          loadOriginalImg: boolean('loadOriginalImg', true),
          contentData: object('Content data', {
            uri: '5ceb9fc82765246c6cc55b47',
            author: {
              slug: '1.0.2',
              first_name: 'Gohar',
              last_name: 'Avetisyan',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK'
            },
            created: 1563889376,
            published: 1563889376,
            status: 'confirmed',
            title: 'In the flesh: translating 2d scans into 3d prints',
            tags: ['2017', 'DEVELOPER', 'FULLSTACK'],
            cover: {
              mimeType: 'image/jpeg',
              size: 66110,
              thumbnail: 'https://south.publiq.network:14123/storage?file=DvbcASk61drT9d4YErAQJ5yjVP3AmQjywS4R4Am8cub7',
              uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
              thumbnailWidth: 300,
              thumbnailHeight: 257
            },
            publication: {
              title: 'UX Planet',
              slug: 'ux_planet',
              image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            boosted: false,
            view_count: '1K',
          }),
          publicationList: object('Publications List', [
            {
              value: 'test-value-1',
              text: 'Test text 1',
              metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test title', last_name: 'News'}
            },
            {
              value: 'test-value-2',
              text: 'Test text 2',
              metaData: {image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', first_name: 'Test title', last_name: 'News'}
            },
          ]),
          imageArrowsShown: boolean('imageArrowsShown', false),
          changeImageShown: boolean('changeImageShown', false),
          className: text('Add Class', ''),
          publicationClick: action('publication clicked'),
          contentClick: action('content clicked'),
          accountClick: action('account clicked'),
          tagClick: action('tag clicked'),
          likeClick: action('Like clicked'),
          imageArrowClick: action('Image arrow clicked'),
          changeImageClick: action('Image change clicked'),
          imageLoaded: action('image loaded'),
          onTagItemSelect: action('Selected Settings'),
          onPublicationSelect: action('Publication Selected'),
        },
      };
    }, {
          notes: contentSingleMarkdown
    })
  .add('edit', () => {
    return {
      component: ContentSingleComponent,
      props: {
        type: radios('type', {
          'edit': 'edit'
        }, 'edit'),
        contentData: object('Content data', {
          uri: '5ceb9fc82765246c6cc55b47',
          created: 1563889376,
          status: 'confirmed',
          published: 1563889376,
          updated: 1563889376,
          title: 'In the flesh: translating 2d scans into 3d prints',
          cover: {
            mimeType: 'image/jpeg',
            size: 66110,
            thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
            uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
            url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
            thumbnailWidth: 300,
            thumbnailHeight: 257
          },
          publication: {
            title: 'UX Planet',
            slug: 'test-value-2',
            image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          history: [
            {
              title: 'history first title',
              slug: 'history_first_slug',
              updated: 1563889376,
            },
            {
              title: 'history second title',
              slug: 'history_second_slug',
              updated: 1563889376,
            },
          ]
        }),
        publicationList: object('Publications List', [
          {
            value: 'test-value-1',
            text: 'Test text 1',
            metaData: {image: 'http://via.placeholder.com/120x120', first_name: 'Test title', last_name: 'News'}
          },
          {
            value: 'test-value-2',
            text: 'Test text 2',
            metaData: {image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', first_name: 'Test title', last_name: 'News'}
          },
        ]),
        hasBoost: boolean('Has Boost', false),
        className: text('Add Class', ''),
        publicationClick: action('publication clicked'),
        contentClick: action('content clicked'),
        accountClick: action('account clicked'),
        tagClick: action('tag clicked'),
        likeClick: action('Like clicked'),
        boostClick: action('Boost clicked'),
        editClick: action('Edit clicked'),
        historyClick: action('History slug'),
        publicationsListClick: action('Publication List Click'),
        imageLoaded: action('image loaded'),
        onTagItemSelect: action('Selected Settings'),
        onPublicationSelect: action('Publication Selected'),
      },
    };
  }, {
    notes: contentSingleMarkdown
  })
;
