import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { InputSuggestionsComponent } from '../../projects/ui-lib/src/lib/molecules/input-suggestions/input-suggestions.component';
import { AvatarComponent } from '../../projects/ui-lib/src/lib/molecules/avatar/avatar.component';
// @ts-ignore
import inputSuggestionsMarkdown from '../../projects/ui-lib/src/lib/molecules/input-suggestions/input-suggestions.component.notes.md';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


storiesOf('Publiq Design|Molecules.Input Suggestions', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [AvatarComponent, InputSuggestionsComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: InputSuggestionsComponent,
      props: {
        suggestions: object('suggestions', [
          {
            'image': 'http://via.placeholder.com/120x120',
            'first_name': 'James',
            'last_name': 'Dean',
            'fullName': 'James Dean',
            'slug': 123456789,
          },
          {
            'image': 'http://via.placeholder.com/120x120',
            'first_name': 'John',
            'last_name': 'Doe',
            'fullName': 'John Doe',
            'slug': 123456789,
          }
        ]),
        onSelect: action('onSelect'),
        onClick: action('onClick')
      },
    };
  }, {
      notes: inputSuggestionsMarkdown
  });
