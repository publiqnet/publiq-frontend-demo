import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { ViewCountComponent } from '../../projects/ui-lib/src/lib/molecules/view-count/view-count.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { DraftComponent } from '../../projects/ui-lib/src/lib/molecules/draft/draft.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { DropdownComponent } from '../../projects/ui-lib/src/lib/molecules/dropdown/dropdown.component';
// @ts-ignore
import draftSingleMarkdown from '../../projects/ui-lib/src/lib/molecules/draft/draft.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../projects/ui-lib/src/core/pipes/localized-date.pipe';

storiesOf('Publiq Design|Molecules.Draft', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [LocalizedDatePipe, ViewCountComponent, ButtonComponent, AvatarComponent, DropdownComponent, DraftComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('single', () => {
    return {
      component: DraftComponent,
      props: {
        type: radios('type', {
          'single': 'single'
        }, 'single'),
        draftData: object('Draft data', {
          slug: '5ceb9fc82765246c6cc55b47',
          created: '11 dec 2019',
          title: 'In the flesh: translating 2d scans into 3d prints',
          image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          published: 1563889376,
          // tslint:disable-next-line:max-line-length
          description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        }),
        className: text('Add Class', ''),
        publicationClick: action('publication clicked'),
        contentClick: action('Content clicked'),
        deleteClick: action('Delete clicked'),
        editClick: action('Edit clicked')
      },
    };
  }, {
    notes: draftSingleMarkdown
  });
