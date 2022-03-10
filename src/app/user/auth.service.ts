import { Injectable } from "@angular/core";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
    currentUser!: IUser;
    /* = {
        id: 0,
        firstName: '',
        lastName: '',
        userName: ''
    };
*/
    loginUser(userName: string, password: string){
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
    }
    isAuthenticated(){
        return !!this.currentUser;
    }
    updateCurrentUser(firstName: string, lastName: string){
        if(this.currentUser){
            this.currentUser.firstName = firstName;
        }
        if(this.currentUser){
            this.currentUser.lastName = lastName;
        }
    }
}