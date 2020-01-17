import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { PublicationBlockComponent } from '../../projects/ui-lib/src/lib/molecules/publication-block/publication-block.component';
import { PublicationSingleComponent } from '../../projects/ui-lib/src/lib/molecules/publication-single/publication-single.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
import { PublicationMembersComponent } from '../../projects/ui-lib/src/lib/molecules/publication-members/publication-members.component';
// @ts-ignore
import publicationBlockMarkdown from '../../projects/ui-lib/src/lib/molecules/publication-block/publication-block.component.notes.md';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../projects/ui-lib/src/lib/atoms/icon/icon.component';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../projects/ui-lib/src/lib/atoms/atoms.module';

storiesOf('Publiq Design|Molecules.Publication Block', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot(), LottieModule.forRoot({player: playerFactory}), ],
      declarations: [PublicationSingleComponent, AvatarComponent, DatumComponent, PublicationMembersComponent, ButtonComponent, PublicationBlockComponent, IconComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: PublicationBlockComponent,
      props: {
        hasMore: boolean('Has More Publications', false),
        countByPage: number('Publications count by page', 2),
        data: object('publication data', [
          {
            title: 'UX Topics 1',
            description: 'Tips & News on Social Media Marketing, Online Advertising, Search Engine Optimization, Content Marketing, Growth Hacking, Branding, Start-Ups and more.',
            logo: '',
            cover: '',
            slug: 'ux_topics',
            subscribersCount: 1234,
            following: true,
            status: 0,
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
          }
        ]),
        getPublication: action('Publication clicked'),
        onFollow: action('Followed'),
      }
    };
  }, {
      notes: publicationBlockMarkdown
  });
