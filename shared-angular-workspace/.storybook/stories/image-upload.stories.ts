import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ImageUploadComponent } from '../../projects/ui-lib/src/lib/molecules/image-upload/image-upload.component';
// @ts-ignore
import imageUploadMarkdown from '../../projects/ui-lib/src/lib/molecules/image-upload/image-upload.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
import { ChipComponent } from '../../projects/ui-lib/src/lib/molecules/chip/chip.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';

storiesOf('Publiq Design|Molecules.Image Upload', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ImageUploadComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: ImageUploadComponent,
      props: {
        imageUrl: text('Image url', ''),
        heading: text('Heading', 'Upload avatar'),
        subheading: text('Subheading', '(Up to 1MB, 288px by 288px recommended)'),
        onChange: action('File uploaded')
      }
    };
  }, {
      notes: imageUploadMarkdown
  });
