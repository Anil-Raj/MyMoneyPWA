import { Component, AfterViewInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PouchDBService } from '../../services/pouchdb.service';
// declare const gapi: any;
// import {GoogleSignInSuccess} from 'angular-google-signin';
import { ICON_REGISTRY_PROVIDER_FACTORY } from '@angular/material';

export class GoogleSignInSuccess {
    public googleUser: gapi.auth2.GoogleUser;

    constructor(googleUser: gapi.auth2.GoogleUser) {
        this.googleUser = googleUser;
    }
}

export class GoogleSignInFailure {
}


@Component({
    selector: 'app-google-signin',
    templateUrl: './google-signin.component.html',
    styleUrls: ['./google-signin.component.css']
})

export class GoogleSignInComponent implements AfterViewInit {

    private clientId = '72448630988-nhnn7e4chtsn0872i77m5hd65pi0aas3.apps.googleusercontent.com';

    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');

    public email;

    // constructor() {
    // }

    // private myClientId = '72448630988-nhnn7e4chtsn0872i77m5hd65pi0aas3.apps.googleusercontent.com';

    private id = 'google-signin2';


    private _fetchBasicProfile: boolean;

    get fetchBasicProfile(): string {
        return this._fetchBasicProfile.toString();
    }

    @Input() set fetchBasicProfile(s: string) {
        this._fetchBasicProfile = Boolean(s);
    }
    ngAfterViewInit() {
        this.auth2Init();
        this.renderButton();
    }

    private auth2Init() {
        if (this.clientId == null) {
            throw new Error(
                'clientId property is necessary. (<google-signin [clientId]="..."></google-signin>)');
        }
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: this.clientId,
                // cookie_policy: this.cookiePolicy,
                // fetch_basic_profile: this._fetchBasicProfile,
                // hosted_domain: this.hostedDomain,
                // openid_realm: this.openidRealm
            });
        });
    }

    private handleFailure() {
        // this.googleSignInFailure.next(new GoogleSignInFailure());
    }

    private handleSuccess(googleUser: gapi.auth2.GoogleUser) {
        // this.googleSignInSuccess.next(new GoogleSignInSuccess(googleUser));
        const id: string = googleUser.getId();
        const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log(profile);

        console.log('ID: ' +
            profile
                .getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        localStorage.setItem('user', 'googleuser_' + profile.getId());
        this.email = profile.getName();

    }

    private renderButton() {
        gapi.signin2.render(
            this.id, {
                scope: this.scope,
                // width: this._width,
                // height: this._height,
                // longtitle: this._longTitle,
                // theme: this.theme,
                onsuccess: (googleUser: gapi.auth2.GoogleUser) => this.handleSuccess(googleUser),
                onfailure: () => this.handleFailure()
            });
    }
}
