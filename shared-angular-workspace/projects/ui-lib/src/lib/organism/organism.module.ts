import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { AtomsModule, playerFactory } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { HeaderComponent } from './header/header.component';
import { RelevantContentComponent } from './relevant-content/relevant-content.component';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    FormsModule,
    CoreModule,
    TranslateModule.forChild(),
    LottieModule.forRoot({player: playerFactory}),
  ],
  declarations: [
    HeaderComponent,
    RelevantContentComponent,
  ],
  exports: [
    HeaderComponent,
    RelevantContentComponent
  ]
})
export class OrganismModule {}
