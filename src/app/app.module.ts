import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule
} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import {
  GoogleAnalyticsService,
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlatformModule } from '@angular/cdk/platform';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelSocketProvider } from './services/general/socket.provider';
import {
  AppInitializerFactory,
  AppInitializerProvider
} from './services/general/app.initializer';
import { HttpInterceptor } from './services/general/http.interceptor';
import { BoxGridComponent } from './components/core/box-grid/box-grid.component';
import { ButtonComponent } from './components/core/button/button.component';
import { CaptchaComponent } from './components/core/captcha/captcha.component';
import { CheckboxComponent } from './components/core/checkbox/checkbox.component';
import { DatePickerComponent } from './components/core/date-picker/date-picker.component';
import { DropdownComponent } from './components/core/dropdown/dropdown.component';
import { FileComponent } from './components/core/file/file.component';
import { AutoCompleteComponent } from './components/core/auto-complete/auto-complete.component';
import { FormComponent } from './components/core/form/form.component';
import { GridComponent } from './components/core/grid/grid.component';
import { InputComponent } from './components/core/input/input.component';
import { NumberComponent } from './components/core/number/number.component';
import { ProgressComponent } from './components/core/progress/progress.component';
import { RadioComponent } from './components/core/radio/radio.component';
import { SwitchComponent } from './components/core/switch/switch.component';
import { TagComponent } from './components/core/tag/tag.component';
import { ValidationComponent } from './components/core/validation/validation.component';
import { WaitingComponent } from './components/core/waiting/waiting.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { PromptComponent } from './modals/prompt/prompt.component';
import { OnlyNumberDirective } from './directives/core/only-number.directive';
import { ReloadOnParamsChangedDirective } from './directives/core/reload-on-params-changed.directive';
import { CulturedDateTimePipe } from './pipes/core/cultured-date-time.pipe';
import { CulturedDatePipe } from './pipes/core/cultured-date.pipe';
import { EnterToBrPipe } from './pipes/core/enter-to-br.pipe';
import { EnumPipe } from './pipes/core/enum.pipe';
import { MomentAgoPipe } from './pipes/core/moment-ago.pipe';
import { StringFormatPipe } from './pipes/core/string-format.pipe';
import { TranslatePipe } from './pipes/core/translate.pipe';
import { TruncatePipe } from './pipes/core/truncate.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { environment } from '../environments/environment';
import { OfflineComponent } from './modals/offline/offline.component';
import { DroptreeComponent } from './components/core/droptree/droptree.component';
import { OnlyPersianDirective } from './directives/core/only-persian.directive';
import { TrustHtmlPipe } from './pipes/core/trust-html.pipe';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {CulturedDateFactory, CulturedDateFormatsFactory} from './library/core/date-time/material-date-adapter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeaderComponent } from './components/app/header/header.component';
import { SidebarComponent } from './components/app/sidebar/sidebar.component';
import { WaitingButtonDirective } from './directives/core/waiting-button.directive';
import { UsersComponent } from './pages/users/users.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PostsComponent } from './pages/posts/posts.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CmsComponent } from './pages/cms/cms.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ErrorsComponent } from './pages/errors/errors.component';
import { MarketersComponent } from './pages/marketers/marketers.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorModalComponent } from './modals/error/error-modal.component';
import { ContactReplyComponent } from './modals/contact-reply/contact-reply.component';
import { WysiwygEditorComponent } from './components/core/wysiwyg-editor/wysiwyg-editor.component';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    CulturedDatePipe,
    CulturedDateTimePipe,
    EnterToBrPipe,
    EnumPipe,
    MomentAgoPipe,
    StringFormatPipe,
    TranslatePipe,
    TruncatePipe,

    OnlyNumberDirective,
    ReloadOnParamsChangedDirective,

    AppComponent,
    AutoCompleteComponent,
    BoxGridComponent,
    ButtonComponent,
    CaptchaComponent,
    CheckboxComponent,
    DatePickerComponent,
    DropdownComponent,
    FileComponent,
    FormComponent,
    GridComponent,
    InputComponent,
    NumberComponent,
    ProgressComponent,
    RadioComponent,
    SwitchComponent,
    TagComponent,
    ValidationComponent,
    WaitingComponent,
    ConfirmComponent,
    PromptComponent,
    OfflineComponent,
    DroptreeComponent,
    OnlyPersianDirective,
    TrustHtmlPipe,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    WaitingButtonDirective,
    UsersComponent,
    BlogComponent,
    CmsComponent,
    PlansComponent,
    TransactionsComponent,
    PostsComponent,
    ErrorsComponent,
    MarketersComponent,
    DiscountsComponent,
    ContactUsComponent,
    WysiwygEditorComponent,
    ErrorModalComponent,
    ContactReplyComponent,
  ],
  entryComponents: [
    ConfirmComponent,
    PromptComponent,
    OfflineComponent,
    ErrorModalComponent,
    ContactReplyComponent,
  ],
  imports: [
    NgxSliderModule,
    PlatformModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    SocketIoModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatSliderModule,
    // MatIconModule,
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
    MatExpansionModule,
    MatChipsModule,
    MatSidenavModule,
    MatTreeModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CKEditorModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: CulturedDateFactory,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: CulturedDateFormatsFactory,
    },
    GoogleAnalyticsService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    },
    {
      provide: Socket,
      useClass: PanelSocketProvider
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true
    },
    AppInitializerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
