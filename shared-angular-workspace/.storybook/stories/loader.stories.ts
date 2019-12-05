import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, radios, text, number } from '@storybook/addon-knobs';
import { AtomsModule } from '../../projects/ui-lib/src/lib/atoms/atoms.module';
import { LoaderComponent } from '../../projects/ui-lib/src/lib/atoms/loader/loader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

storiesOf('Publiq Design|Atoms.Loader', module)
  .addDecorator(
    moduleMetadata({
      imports: [ AtomsModule, LottieModule.forRoot({player: playerFactory}) ],
      providers: [
        LottieModule.forRoot({player: playerFactory}),
      ]
    })
  )
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: LoaderComponent,
      props: {
        size: number('Size', 60),
        color: radios('color', {
          'Blue': 'blue',
          'Multi': 'multi',
          'White': 'white'
        }, 'blue'),
      },
    };
  });

