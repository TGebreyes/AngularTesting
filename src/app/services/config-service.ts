
import {Inject, Injectable, InjectionToken} from '@angular/core';

@Injectable()
export class ConfigService implements IAppConfig {
    apiEndpoint!: string; 
}
export let APP_CONFIG = new InjectionToken<IAppConfig>("{apiEndpoint: AppConfig}");

export interface IAppConfig {
    apiEndpoint: string;
}
export const AppConfig: IAppConfig = {    
    apiEndpoint: "https://localhost:15422/api/"    
};
