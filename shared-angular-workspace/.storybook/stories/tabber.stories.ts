import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, radios, text } from '@storybook/addon-knobs';
import { TabberComponent } from '../../projects/ui-lib/src/lib/molecules/tabber/tabber.component';
import { action } from '@storybook/addon-actions';
// @ts-ignore
import tabberMarkdown from '../../projects/ui-lib/src/lib/molecules/tabber/tabber.component.notes.md';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '../../projects/ui-lib/src/lib/atoms/select/select.component';


storiesOf('Publiq Design|Molecules.Tabber', module)
  .addDecorator(
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
      declarations: [TabberComponent],
    })
  )
  .addDecorator(withKnobs)
  .add('buttons', () => {
    return {
      component: TabberComponent,
      props: {
        type: radios('navigation', {
          'buttons': 'buttons',
        }, 'buttons'),
        tabs: object('Tabs Data', [
          {
            value: '1',
            text: 'Stories',
          },
          {
            value: '2',
            text: 'Followers',
            count: 4,
          }
        ]),
        currentValue: text('Current value', '1'),
        className: text('Add Class', ''),
        onTabChange: action('change tab event'),
      }
    };
  }, {
    notes: tabberMarkdown
  })
  .add('navigation', () => {
    return {
      component: TabberComponent,
      props: {
        type: radios('navigation', {
          'navigation': 'navigation',
        }, 'navigation'),
        tabs: object('Tabs Data', [
          {
            value: '1',
            text: 'Stories',
          },
          {
            value: '2',
            text: 'Followers',
            count: 4,
          }
        ]),
        currentValue: text('Current value', '1'),
        className: text('Add Class', ''),
        onTabChange: action('change tab event'),
      }
    };
  }, {
    notes: tabberMarkdown
  });
