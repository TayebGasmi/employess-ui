import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from "./layout/app.layout.module";
import {SharedModule} from "./module/shared/shared.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TaskModule} from "./module/task/task.module";
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./module/auth.interceptor";
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from "./home/home.component";
import {UsersModule} from "./module/users/users.module";
import {DividerModule} from "primeng/divider";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {GraphQLModule} from "./graphql.module";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    SharedModule,
    ToastModule,
    TaskModule,
    GraphQLModule,
    TaskModule,
    KeycloakAngularModule,
    UsersModule,
    DividerModule,
    PanelModule,
    ButtonModule,
    RippleModule,
    ToolbarModule
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
