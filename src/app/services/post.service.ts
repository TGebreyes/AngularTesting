import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

class Post {
    constructor(
        public id: string,
        public title: string,
        public body: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PostService {
    private endpoint = 'https://jsonplaceholder.typicode.com/xyz';

    constructor(private http: HttpClient) { }

    getPost(): Observable<Post[]> {
      // http interceptor is called
      return this.http.get<Post[]>(this.endpoint)
    }
}