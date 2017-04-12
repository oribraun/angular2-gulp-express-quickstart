/**
 * Created by ori on 4/12/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'my-app',
    template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent implements OnInit {
    private usersUrl = 'http://localhost:3000/api/getAllUsers';  // URL to web API
    private users : any[];
    private errorMessage:string;
    constructor (private http: Http) {}
    getAllUsers(): Observable<any[]> {
        return this.http.get(this.usersUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    ngOnInit() { this.getAllUsers().subscribe(
        heroes => this.users = heroes,
        error =>  this.errorMessage = <any>error); }
    name = 'Angular';
}
