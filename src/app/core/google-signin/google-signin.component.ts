import { Component, ElementRef, AfterViewInit, VERSION } from '@angular/core';
import { PouchDBService } from '../transaction/services/pouchdb.service';
declare const gapi: any;

@Component({
    selector: 'app-google-signin',
    templateUrl: './google-signin.component.html',
    styleUrls: ['./google-signin.component.css']
})

export class GoogleSigninComponent implements AfterViewInit {

    private clientId = '72448630988-nhnn7e4chtsn0872i77m5hd65pi0aas3.apps.googleusercontent.com';

    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');
    user;
    public auth2: any;

    public googleInit() {

        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.clientId,
                cookiepolicy: 'single_host_origin',
                scope: this.scope
            });
            this.attachSignin(this.element.nativeElement.firstChild);
        });
    }

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
                const profile = googleUser.getBasicProfile();
                console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
            }, function (error) {
                console.log(JSON.stringify(error, undefined, 2));
            });
    }

    constructor(private element: ElementRef, private database: PouchDBService) {
        console.log('ElementRef: ', this.element);
    }

    ngAfterViewInit() {
        //     this.googleInit();
    }
    a() {
        // this.googleInit();
        console.log(this.user);
        localStorage.setItem('user', this.user);
        this.database.sync(this.user);

    }
}