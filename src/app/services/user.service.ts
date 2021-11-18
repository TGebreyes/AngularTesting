
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users/user';
import { AppConfig, APP_CONFIG } from '../app.config.module';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.config.apiEndpoint}/users`);
    }
}
