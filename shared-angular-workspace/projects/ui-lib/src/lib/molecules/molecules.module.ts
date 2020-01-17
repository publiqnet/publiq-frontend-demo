import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { ViewCountComponent } from './view-count/view-count.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { AtomsModule } from '../atoms/atoms.module';
import { DatumComponent } from './datum/datum.component';
import { TabberComponent } from './tabber/tabber.component';
import { ProgressComponent } from './progress/progress.component';
import { PublicationSingleComponent } from './publication-single/publication-single.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ContentSingleComponent } from './content-single/content-single.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { TagMenuComponent } from './tag-menu/tag-menu.component';
import { ChannelTypeMenuComponent } from './channel-type-menu/channel-type-menu.component';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSingleComponent } from './user-single/user-single.component';
import { ChipComponent } from './chip/chip.component';
import { InputSuggestionsComponent } from './input-suggestions/input-suggestions.component';
import { InvitationActionsComponent } from './invitation-actions/invitation-actions.component';
import { LoadingBlockComponent } from './loading-block/loading-block.component';
import { CoreModule } from '../../core/core.module';
import { PublicationBlockComponent } from './publication-block/publication-block.component';
import { PublicationMembersComponent } from './publication-members/publication-members.component';
import { DraftComponent } from './draft/draft.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { BoostContentSingleComponent } from './boost-content-single/boost-content-single.component';
import { AuthorBlockComponent } from './author-block/author-block.component';
import { AuthorSingleComponent } from './author-single/author-single.component';
import { HighlightsComponent } from './highlights/highlights.component';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CoreModule,
    TranslateModule.forChild()
  ],
  declarations: [
    AvatarComponent,
    ViewCountComponent,
    WelcomeMessageComponent,
    DatumComponent,
    TabberComponent,
    DropdownComponent,
    DropdownListComponent,
    TagMenuComponent,
    ChannelTypeMenuComponent,
    NotificationMenuComponent,
    ProgressComponent,
    PublicationSingleComponent,
    ImageUploadComponent,
    UserSingleComponent,
    ChipComponent,
    InputSuggestionsComponent,
    InvitationActionsComponent,
    LoadingBlockComponent,
    ContentSingleComponent,
    PublicationBlockComponent,
    PublicationMembersComponent,
    DraftComponent,
    NotificationCardComponent,
    BoostContentSingleComponent,
    AuthorBlockComponent,
    AuthorSingleComponent,
    HighlightsComponent
  ],
  exports: [
    AvatarComponent,
    ViewCountComponent,
    WelcomeMessageComponent,
    TabberComponent,
    DatumComponent,
    DropdownComponent,
    DropdownListComponent,
    TagMenuComponent,
    ChannelTypeMenuComponent,
    NotificationMenuComponent,
    ProgressComponent,
    PublicationSingleComponent,
    ImageUploadComponent,
    UserSingleComponent,
    ChipComponent,
    InputSuggestionsComponent,
    InvitationActionsComponent,
    LoadingBlockComponent,
    ContentSingleComponent,
    PublicationBlockComponent,
    PublicationMembersComponent,
    DraftComponent,
    NotificationCardComponent,
    BoostContentSingleComponent,
    AuthorBlockComponent,
    AuthorSingleComponent,
    HighlightsComponent
  ],
  entryComponents: []
})
export class MoleculesModule {}
export {NotificationCardComponent};
