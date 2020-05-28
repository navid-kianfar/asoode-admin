import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPopperModule } from 'ngx-popper';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { BarChartModule } from '@swimlane/ngx-charts';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatRadioModule,
  MatRippleModule,
} from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ngx-ckeditor';

import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptor } from './services/general/http.interceptor';
import {
  AppInitializerFactory,
  AppInitializerProvider,
} from './services/general/app.initializer';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/reports/dashboard/dashboard.component';
import { CaptchaComponent } from './components/core/captcha/captcha.component';
import { WaitingComponent } from './components/core/waiting/waiting.component';
import { InputComponent } from './components/core/input/input.component';
import { SwitchComponent } from './components/core/switch/switch.component';
import { TagComponent } from './components/core/tag/tag.component';
import { RadioComponent } from './components/core/radio/radio.component';
import { DropdownComponent } from './components/core/dropdown/dropdown.component';
import { FormComponent } from './components/core/form/form.component';
import { FileComponent } from './components/core/file/file.component';
import { EditorComponent } from './components/core/editor/editor.component';
import { DatePickerComponent } from './components/core/date-picker/date-picker.component';
import { ZonePickerComponent } from './components/core/zone-picker/zone-picker.component';
import { CountryPickerComponent } from './components/core/country-picker/country-picker.component';
import { ColorPickerComponent } from './components/core/color-picker/color-picker.component';
import { CheckboxComponent } from './components/core/checkbox/checkbox.component';
import { ButtonComponent } from './components/core/button/button.component';
import { CalendarComponent } from './components/core/calendar/calendar.component';
import { BoxGridComponent } from './components/core/box-grid/box-grid.component';
import { AutoCompleteComponent } from './components/core/auto-complete/auto-complete.component';
import { DocViewerComponent } from './components/core/doc-viewer/doc-viewer.component';
import { EmojiPickerComponent } from './components/core/emoji-picker/emoji-picker.component';
import { MapComponent } from './components/core/map/map.component';
import { LocationPickerComponent } from './components/core/location-picker/location-picker.component';
import { ScheduleComponent } from './components/core/schedule/schedule.component';
import { ProgressComponent } from './components/core/progress/progress.component';
import { GridComponent } from './components/core/grid/grid.component';
import { TranslatePipe } from './pipes/core/translate.pipe';
import { ValidationComponent } from './components/core/validation/validation.component';
import { OnlyNumberDirective } from './directives/core/only-number.directive';
import { CulturedDatePipe } from './pipes/core/cultured-date.pipe';
import { CulturedDateTimePipe } from './pipes/core/cultured-date-time.pipe';
import { MomentAgoPipe } from './pipes/core/moment-ago.pipe';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { EnterToBrPipe } from './pipes/core/enter-to-br.pipe';
import { StringFormatPipe } from './pipes/core/string-format.pipe';
import { PromptComponent } from './modals/prompt/prompt.component';
import { CtrlClickDirective } from './directives/core/ctrl-click.directive';
import { SearchPipe } from './pipes/core/search.pipe';
import { EnumPipe } from './pipes/core/enum.pipe';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { TrendModule } from 'ngx-trend';
import { TruncatePipe } from './pipes/core/truncate.pipe';
import { MsToDurationPipe } from './pipes/core/ms-to-duration.pipe';
import { ReloadOnParamsChangedDirective } from './directives/core/reload-on-params-changed.directive';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { TimeSpanComponent } from './components/core/time-span/time-span.component';
import { NumberComponent } from './components/core/number/number.component';
import { TimePickerComponent } from './components/core/time-picker/time-picker.component';
import { HeaderComponent } from './components/app/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CmsComponent } from './pages/cms/cms.component';
import { PlansComponent } from './pages/plans/plans.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PostsComponent } from './pages/posts/posts.component';
import { WysiwygEditorComponent } from './components/core/wysiwyg-editor/wysiwyg-editor.component';
import { ErrorsComponent } from './pages/errors/errors.component';
import { MarketersComponent } from './pages/marketers/marketers.component';
import { ErrorModalComponent } from './modals/error/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CaptchaComponent,
    WaitingComponent,
    InputComponent,
    SwitchComponent,
    TagComponent,
    RadioComponent,
    DropdownComponent,
    FormComponent,
    FileComponent,
    EditorComponent,
    DatePickerComponent,
    ZonePickerComponent,
    CountryPickerComponent,
    ColorPickerComponent,
    CheckboxComponent,
    ButtonComponent,
    CalendarComponent,
    BoxGridComponent,
    AutoCompleteComponent,
    DocViewerComponent,
    EmojiPickerComponent,
    MapComponent,
    LocationPickerComponent,
    ScheduleComponent,
    ProgressComponent,
    GridComponent,
    TranslatePipe,
    ValidationComponent,
    OnlyNumberDirective,
    CulturedDatePipe,
    CulturedDateTimePipe,
    MomentAgoPipe,
    ConfirmComponent,
    EnterToBrPipe,
    StringFormatPipe,
    PromptComponent,
    CtrlClickDirective,
    SearchPipe,
    EnumPipe,
    TruncatePipe,
    MsToDurationPipe,
    ReloadOnParamsChangedDirective,
    TimeSpanComponent,
    NumberComponent,
    TimePickerComponent,
    HeaderComponent,
    UsersComponent,
    BlogComponent,
    CmsComponent,
    PlansComponent,
    TransactionsComponent,
    PostsComponent,
    WysiwygEditorComponent,
    ErrorsComponent,
    MarketersComponent,
    ErrorModalComponent,
  ],
  entryComponents: [ConfirmComponent, PromptComponent, ErrorModalComponent],
  imports: [
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    DeviceDetectorModule.forRoot(),
    QuillModule.forRoot(),
    SimpleModalModule.forRoot(
      { container: 'modal-container' },
      {
        ...defaultSimpleModalOptions,
        closeOnEscape: true,
        closeOnClickOutside: true,
        wrapperClass: 'in',
        wrapperDefaultClasses: 'modal fade-anim',
        bodyClass: 'modal-open',
      },
    ),
    NgxPopperModule.forRoot({ placement: 'bottom' }),
    RoundProgressModule,
    BarChartModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRippleModule,
    MomentModule,
    ContentLoaderModule,
    TrendModule,
    DragDropModule,
    ColorPickerModule,
  ],
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true,
    },
    AppInitializerProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
