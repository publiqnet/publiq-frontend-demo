import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, radios, text } from '@storybook/addon-knobs';
import { ClickOutsideDirective } from '../../projects/ui-lib/src/core/directives/click-outside.directive';
// @ts-ignore
import notificationCardMarkdown from '../../projects/ui-lib/src/lib/molecules/notification-card/notification-card.component.notes.md';
import { NotificationCardComponent } from '../../projects/ui-lib/src/lib/molecules/notification-card/notification-card.component';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.Notification Card', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ClickOutsideDirective, ButtonComponent, NotificationCardComponent]
    })
  )
  .addDecorator(withKnobs)
  .add('success', () => {
    return {
      component: NotificationCardComponent,
      props: {
        type: radios('type', {
          'success': 'success',
        }, 'success'),
        cardData: object('Card data', {
          title: 'Success!',
          description: 'Awesome job! Everything fine!',
          duration: 4000,
          type: 'success'
        }),
        className: text('Add Class', ''),
        id: 'success-notification',
        autoClose: true,
        autoShow: false
      },
    };
  }, {
    notes: notificationCardMarkdown
  })
  .add('error', () => {
    return {
      component: NotificationCardComponent,
      props: {
        type: radios('type', {
          'error': 'error',
        }, 'error'),
        cardData: object('Card data', {
          title: 'Error, Something is wrong',
          description: '',
          type: 'error'
        }),
        className: text('Add Class', ''),
        id: 'error-notification',
        autoClose: true,
        autoShow: false
      },
    };
  }, {
    notes: notificationCardMarkdown
  })
  .add('warning', () => {
    return {
      component: NotificationCardComponent,
      props: {
        type: radios('type', {
          'warning': 'warning',
        }, 'warning'),
        cardData: object('Card data', {
          title: 'Warning!',
          description: 'There seems to be a problem',
          type: 'warning'
        }),
        className: text('Add Class', ''),
        id: 'warning-notification',
        autoClose: true,
        autoShow: false
      },
    };
  }, {
    notes: notificationCardMarkdown
  })
  .add('info', () => {
    return {
      component: NotificationCardComponent,
      props: {
        type: radios('type', {
          'info': 'info',
        }, 'info'),
        cardData: object('Card data', {
          title: 'Info!',
          description: 'Are you 100% sure about that ?',
          type: 'info'
        }),
        className: text('Add Class', ''),
        id: 'info-notification',
        autoClose: true,
        autoShow: false
      },
    };
  }, {
    notes: notificationCardMarkdown
  })
