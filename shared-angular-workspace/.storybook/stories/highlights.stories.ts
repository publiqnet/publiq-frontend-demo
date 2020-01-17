import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, object } from '@storybook/addon-knobs';
// @ts-ignore
import { TranslateModule } from '@ngx-translate/core';
import highlightsMarkdown from '../../projects/ui-lib/src/lib/molecules/highlights/highlights.component.notes.md';
import { HighlightsComponent } from '../../projects/ui-lib/src/lib/molecules/highlights/highlights.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { action } from '@storybook/addon-actions';

storiesOf('Publiq Design|Molecules.Highlights', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [HighlightsComponent],
      providers: [UtilService],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: HighlightsComponent,
      props: {
        highlightData: object('Highlight data', {
          uri: 'WPCMvxaPbqJf2bWiqEQp7bY418wSDfZJQE5hRZajr8D',
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
          highlightBackground: '',
          highlightFont: 'Lato'
        }),
        className: text('Add Classes'),
        highlightClick: action('👊 Highlight was clicked'),
      }
    };
  }, {
      notes: highlightsMarkdown
  });
