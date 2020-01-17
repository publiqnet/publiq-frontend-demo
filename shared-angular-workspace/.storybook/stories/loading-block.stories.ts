import { storiesOf } from '@storybook/angular';
import { withKnobs, text, radios , number} from '@storybook/addon-knobs';
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
  })
  .add('line', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Line': 'line' }, 'line'),
        width: number('Width', 120),
        height: number('Height', 20),
        borderRadius: number('Border Radius', 4),
        className: text('Class Name', '')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  })
  .add('item-list', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Item list': 'item-list' }, 'item-list')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  })
  .add('boostable', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Boostable': 'boostable' }, 'boostable')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  })
  .add('highlight', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Highlight': 'highlight' }, 'highlight')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  })
  .add('recommended', () => {
    return {
      component: LoadingBlockComponent,
      props: {
        type: radios('Type', { 'Recommended publications': 'recommended' }, 'recommended')
      }
    };
  }, {
      notes: loadingBlockMarkdown
  });
