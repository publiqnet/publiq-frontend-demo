import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LinkComponent } from './link/link.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from './toggle/toggle.component';
import { CoreModule } from '../../core/core.module';
import { LoaderComponent } from './loader/loader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from './icon/icon.component';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    LottieModule.forRoot({player: playerFactory}),
    TranslateModule.forChild()
  ],
  declarations: [
    ButtonComponent,
    InputComponent,
    LinkComponent,
    SelectComponent,
    TextareaComponent,
    ToggleComponent,
    LoaderComponent,
    IconComponent
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    LinkComponent,
    SelectComponent,
    TextareaComponent,
    ToggleComponent,
    LoaderComponent,
    IconComponent
  ],
  providers: [],
  entryComponents: []
})
export class AtomsModule {}
