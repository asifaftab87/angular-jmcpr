import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, tap } from 'rxjs';
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
    currentUser!: IUser;
    constructor(private http: HttpClient){ }
    checkAuthenticationStatus(){
        this.http.get('./api/currentIdentity')
            .pipe(tap(data=> {
                if(data instanceof Object){
                    this.currentUser = <IUser>data;
                }
            }))
            .subscribe();
    }
    loginUser(userName: string, password: string){
        let loginInfo = { username: userName, password: password };
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = (<any>data)['user'];
                console.log(this.currentUser);
            }))
            .pipe(catchError(err=> {
                return of(false);
            }));
        /*
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
        */
    }
    isAuthenticated(){
        return !!this.currentUser;
    }
    updateCurrentUser(firstName: string, lastName: string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }
    private handleError<T>(operation = 'operation', result?: T){
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T)
        } 
    }
    logout(){
        let obj: any;
        this.currentUser = obj;
        obj = undefined
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('./api/logout', {}, options);
    }
}