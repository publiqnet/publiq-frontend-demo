import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { PublicationMembersComponent } from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
// @ts-ignore
import publicationMembersMarkdown from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.Publication Members', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      providers: [UtilService],
      declarations: [AvatarComponent, DatumComponent, PublicationMembersComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: PublicationMembersComponent,
      props: {
        membersData: object('member', [{
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
            }],
        ),
        className: text('Add Class', ''),
        iconClassName: text('Add Icon Class', ''),
        getMember: action('member clicked')
      },
    };
  }, {
      notes: publicationMembersMarkdown
  });
