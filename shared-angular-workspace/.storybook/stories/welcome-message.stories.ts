import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { WelcomeMessageComponent } from '../../projects/ui-lib/src/lib/molecules/welcome-message/welcome-message.component'; 
import { InputComponent } from '../../projects/ui-lib/src/lib/atoms/input/input.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
// @ts-ignore
import welcomeMessageMarkdown from '../../projects/ui-lib/src/lib/molecules/welcome-message/welcome-message.component.notes.md';
import { UtilService } from '../../projects/ui-lib/src/core/services/util.service';
import { TranslateModule } from '@ngx-translate/core';


storiesOf('Publiq Design|Molecules.Welcome message', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [InputComponent, ButtonComponent, WelcomeMessageComponent],
      providers: [UtilService]
    })
  )
  .addDecorator(withKnobs)
  .add('welcome to media', () => {
    return {
      component: WelcomeMessageComponent,
      props: {
        type: 'welcome_to_media',
        onClosed: action('onClosed'),
        onSubmit: action('onSubmit'),
      },
    };
  }, {
      notes: welcomeMessageMarkdown
  })
  .add('welcome to media - loading', () => {
    return {
      component: WelcomeMessageComponent,
      props: {
        type: 'welcome_to_media_loading'
      },
    };
  }, {
      notes: welcomeMessageMarkdown
  })
  .add('start earning', () => {
    return {
      component: WelcomeMessageComponent,
      props: {
        type: 'start_earning',
        onClosed: action('onClosed'),
        onSubmit: action('onSubmit'),
      },
    };
  }, {
      notes: welcomeMessageMarkdown
  });
