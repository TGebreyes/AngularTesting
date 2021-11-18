import { Inject, Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { of, catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/catch';
import { AppSettings } from "./appsettings";
import { AppConfig, APP_CONFIG } from '../app.config.module';

// const SETTINGS_LOCATION = "assets/appsettings.json";
// const SETTINGS_KEY = "configuration";

@Injectable()
export class AppSettingsService {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private httpClient: HttpClient) {
    }
    getSettingsAppSetting(): Observable<AppSettings> {
        let settings = new AppSettings();
        return of<AppSettings>(settings);
    }

    getSettings(): Observable<AppSettings> {
        return this.httpClient.get<AppSettings>(this.config.configurationKey)
        .pipe(catchError(this.handleErrors))
    }
    
    private handleErrors(error: any): Observable<AppSettings> {
        // Log the error to the console
        switch (error.status) {
          case 404:
            console.error("Can't find file: " + this.config.configSettingLocation);
            break;
          default:
            console.error(error);
            break;
        }
        
        // Return default configuration values
        return of<AppSettings>(new AppSettings());
      }
      // Using localStorage

      saveLocalStorageSettings(settings: AppSettings) {
        localStorage.setItem(this.config.configurationKey, JSON.stringify(settings));
      }
      getLocalStorageDettings(): Observable<AppSettings> {
        let settings = localStorage.getItem(this.config.configurationKey);
        
        if (settings) {
            return of(JSON.parse(settings));
        }
        else {
            return this.httpClient.get(this.config.configSettingLocation).pipe(
                    map((response: any) => {
                            let settings = response.json() || {};
                            if (settings) {
                                this.saveLocalStorageSettings(settings) 
                            }                
                            return settings;
            }), 
            catchError(this.handleErrors));
        }
    }     
    deleteLocalSettings(): void {
        localStorage.removeItem(this.config.configurationKey);
      }    
    
}
