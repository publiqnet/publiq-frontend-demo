import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ViewCountComponent } from '../../projects/ui-lib/src/lib/molecules/view-count/view-count.component';
// @ts-ignore
import viewCountMarkdown from '../../projects/ui-lib/src/lib/molecules/view-count/view-count.component.notes.md';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { NotificationCardComponent } from '../../projects/ui-lib/src/lib/molecules/notification-card/notification-card.component';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.ViewCount', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ButtonComponent, NotificationCardComponent, ViewCountComponent]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: ViewCountComponent,
      props: {
        text: text('Text', '25K'),
        className: text('Add class', ''),
        iconClassName: text('Add Class For Icon', ''),
      }
    };
  }, {
      notes: viewCountMarkdown
  });
