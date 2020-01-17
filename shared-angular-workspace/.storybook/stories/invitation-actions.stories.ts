import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../../projects/ui-lib/src/lib/atoms/button/button.component';
import { InvitationActionsComponent } from '../../projects/ui-lib/src/lib/molecules/invitation-actions/invitation-actions.component';
// @ts-ignore
import invitationActionsMarkdown from '../../projects/ui-lib/src/lib/molecules/invitation-actions/invitation-actions.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.Invitation actions', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [ButtonComponent, InvitationActionsComponent]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: InvitationActionsComponent,
      props: {
        inviter: object("User", {
          "slug": "1.0.2",
          "first_name": "Gohar",
          "last_name": "Avetisyan",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK"
        }),
        className: text("className", ''),
        actionSelected: action("Action Selected"),
        inviterClicked: action("Inviter clicked")
      }
    };
  }, {
      notes: invitationActionsMarkdown
  });
