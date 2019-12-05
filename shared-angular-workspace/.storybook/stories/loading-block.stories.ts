import { storiesOf } from '@storybook/angular';
import { withKnobs, text, radios } from '@storybook/addon-knobs';
import { LoadingBlockComponent } from '../../projects/ui-lib/src/lib/molecules/loading-block/loading-block.component';
// @ts-ignore
import loadingBlockMarkdown from '../../projects/ui-lib/src/lib/molecules/loading-block/loading-block.component.notes.md';

storiesOf('Publiq Design|Molecules.Loading Block', module)
  .addDecorator(withKnobs)
  .add('grid', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Grid': 'grid' }, 'grid')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  })
  .add('single', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Single': 'single' }, 'single')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  });
