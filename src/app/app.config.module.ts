
import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';
import { IAppConfig } from './services/config-service';

// export interface IAppConfig {
//     apiEndpoint: string;
//     otherInfo: string;
// }

export class AppConfig implements IAppConfig  {
    apiEndpoint: string;
    apiAuthEndPoint: string;
    configurationKey: string;
    configSettingLocation: string;    
    otherInfo: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config'); // app.donfig is a description


export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint!: environment.apiEndpoint,
  apiAuthEndPoint: environment.apiAuthEndpoint,
  configurationKey: environment.configurationKey,
  configSettingLocation: environment.configSettingLocation,
  otherInfo: "Hello"
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
