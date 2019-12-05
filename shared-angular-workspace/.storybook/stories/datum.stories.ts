import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
import { DatumComponent } from '../../projects/ui-lib/src/lib/molecules/datum/datum.component';
// @ts-ignore
import datumMarkdown from '../../projects/ui-lib/src/lib/molecules/datum/datum.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Publiq Design|Molecules.Datum', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [DatumComponent]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: DatumComponent,
      props: {
        count: text('Enter Count', '11'),
        property: text('Enter Property', 'Stories'),
        className: text('Add Classes'),
        iconClassName: text('Add Class For Icon', ''),
      }
    };
  }, {
      notes: datumMarkdown
  });
