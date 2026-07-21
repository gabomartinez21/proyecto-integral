import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
 providedIn:'root'
})
export class AuthService {

constructor(
 private http:HttpClient
){}

login(email:string,password:string){
return this.http.post(
 `${environment.apiUrl}/auth/login`,
 {
  email,
  password
 }
);
}

logout(){
localStorage.removeItem('token');
}

getToken(){
return localStorage.getItem('token');
}

isAuthenticated(){
return !!this.getToken();
}

}
