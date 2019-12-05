import { moduleMetadata, storiesOf } from '@storybook/angular';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { BoostContentSingleComponent } from '../../projects/ui-lib/src/lib/molecules/boost-content-single/boost-content-single.component';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, radios, boolean, object } from '@storybook/addon-knobs';
// @ts-ignore
import boostMarkdown from '../../projects/ui-lib/src/lib/molecules/boost-content-single/boost-content-single.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
import { NotificationMenuComponent } from '../../projects/ui-lib/src/lib/molecules/notification-menu/notification-menu.component';
import { ContentSingleComponent } from '../../projects/ui-lib/src/lib/molecules/content-single/content-single.component';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
storiesOf('Publiq Design|Molecules.Boost Single', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [
        ButtonComponent,
        ClickOutsideDirective,
        // ContentSingleComponent,
        LocalizedDatePipe,
        BoostContentSingleComponent
      ],
      providers: [UtilService],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: BoostContentSingleComponent,
      props: {
        boostContentData: object ('Boost Data', {
          uri: '5ceb9fc82765246c6cc55b47',
          title: 'Searching for my brain surgeon taught me to think differently about my design career',
          views: 123,
          slug: 'ux_planet',
          cover: {
            mimeType: 'image/jpeg',
            size: 66110,
            thumbnail: 'https://stage-mainnet-state.publiq.network/uploads/thumbnails/9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD-thumbnail.jpg',
            uri: '9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
            url: 'https://south.publiq.network:14123/storage?file=9ozyBPRsbfFxtTNciW6GHoD5wDAREUkrQ22v7hZ2gfcD',
            thumbnailWidth: 300,
            thumbnailHeight: 257
          },
          published: 1563889376,
          boosted: true,
          status: 'confirmed',
          publication: null,
          totalView: 456,
          channelsCount: 789,
          totalBoostData: 35,
          boosts: object('Boosts List', [
            {
              transaction: {
                transactionHash: 'DYGkFrnwNv4DdqyEqKkiLpZga4VHyFXt7PPrDEmRwsjG',
                transactionSize: 602,
                timeSigned: 1571926356
              },
              startTimePoint: 1571926356,
              hours: 24,
              whole: 60,
              fraction: 0,
              status: 'active',
              endTimePoint: 1571926357,
              balance: 12345,
              summary: {
                spentWhole: 123,
                spentFraction: 456,
                spentBalance: 789,
              }
            },
            {
              transaction: {
                transactionHash: 'DYGkFrnwNv4DdqyEqKkiLpZga4VHyFXt7PPrDEmRwsjG',
                transactionSize: 602,
                timeSigned: 1571926356
              },
              startTimePoint: 1571926356,
              hours: 24,
              whole: 30,
              fraction: 0,
              status: 'finished',
              endTimePoint: 1571926357,
              balance: 12345,
              summary: {
                spentWhole: 123,
                spentFraction: 456,
                spentBalance: 789,
              }
            },
            {
              transaction: {
                transactionHash: 'DYGkFrnwNv4DdqyEqKkiLpZga4VHyFXt7PPrDEmRwsjG',
                transactionSize: 602,
                timeSigned: 1571926356
              },
              startTimePoint: 1571926356,
              hours: 24,
              whole: 50,
              fraction: 0,
              status: 'cancelled',
              endTimePoint: 1571926357,
              balance: 12345,
              summary: {
                spentWhole: 123,
                spentFraction: 456,
                spentBalance: 789,
              }
            },
          ]),
          boostSummary: {
            whole: 89,
            fraction: 0,
            views: 0,
            channels: 0
          },
        }),
        boostClick: action('Boost clicked'),
        className: text('Add Class', ''),
        contentClick: action('Content clicked'),
      },
  };
    }, {
    notes: boostMarkdown
  });
