"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GoogleSignInSuccess = /** @class */ (function () {
    function GoogleSignInSuccess(googleUser) {
        this.googleUser = googleUser;
    }
    return GoogleSignInSuccess;
}());
exports.GoogleSignInSuccess = GoogleSignInSuccess;
var GoogleSignInFailure = /** @class */ (function () {
    function GoogleSignInFailure() {
    }
    return GoogleSignInFailure;
}());
exports.GoogleSignInFailure = GoogleSignInFailure;
var GoogleSignInComponent = /** @class */ (function () {
    function GoogleSignInComponent() {
        this.clientId = '72448630988-nhnn7e4chtsn0872i77m5hd65pi0aas3.apps.googleusercontent.com';
        this.scope = [
            'profile',
            'email',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/admin.directory.user.readonly'
        ].join(' ');
        // constructor() {
        // }
        // private myClientId = '72448630988-nhnn7e4chtsn0872i77m5hd65pi0aas3.apps.googleusercontent.com';
        this.id = 'google-signin2';
    }
    Object.defineProperty(GoogleSignInComponent.prototype, "fetchBasicProfile", {
        get: function () {
            return this._fetchBasicProfile.toString();
        },
        set: function (s) {
            this._fetchBasicProfile = Boolean(s);
        },
        enumerable: true,
        configurable: true
    });
    GoogleSignInComponent.prototype.ngAfterViewInit = function () {
        this.auth2Init();
        this.renderButton();
    };
    GoogleSignInComponent.prototype.auth2Init = function () {
        var _this = this;
        if (this.clientId == null) {
            throw new Error('clientId property is necessary. (<google-signin [clientId]="..."></google-signin>)');
        }
        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: _this.clientId,
            });
        });
    };
    GoogleSignInComponent.prototype.handleFailure = function () {
        // this.googleSignInFailure.next(new GoogleSignInFailure());
    };
    GoogleSignInComponent.prototype.handleSuccess = function (googleUser) {
        // this.googleSignInSuccess.next(new GoogleSignInSuccess(googleUser));
        var id = googleUser.getId();
        var profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log('ID: ' +
            profile
                .getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        localStorage.setItem('user', 'googleuser_' + profile.getId());
        this.email = profile.getName();
    };
    GoogleSignInComponent.prototype.renderButton = function () {
        var _this = this;
        gapi.signin2.render(this.id, {
            scope: this.scope,
            // width: this._width,
            // height: this._height,
            // longtitle: this._longTitle,
            // theme: this.theme,
            onsuccess: function (googleUser) { return _this.handleSuccess(googleUser); },
            onfailure: function () { return _this.handleFailure(); }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], GoogleSignInComponent.prototype, "fetchBasicProfile", null);
    GoogleSignInComponent = __decorate([
        core_1.Component({
            selector: 'app-google-signin',
            templateUrl: './google-signin.component.html',
            styleUrls: ['./google-signin.component.css']
        })
    ], GoogleSignInComponent);
    return GoogleSignInComponent;
}());
exports.GoogleSignInComponent = GoogleSignInComponent;
//# sourceMappingURL=google-signin.component.js.map