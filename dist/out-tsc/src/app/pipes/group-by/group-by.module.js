"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var group_by_pipe_1 = require("./group-by.pipe");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var view_by_pipe_1 = require("../view-by/view-by.pipe");
var GroupByModule = /** @class */ (function () {
    function GroupByModule() {
    }
    GroupByModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [group_by_pipe_1.GroupByPipe, view_by_pipe_1.ViewByPipe],
            exports: [group_by_pipe_1.GroupByPipe, view_by_pipe_1.ViewByPipe]
        })
    ], GroupByModule);
    return GroupByModule;
}());
exports.GroupByModule = GroupByModule;
//# sourceMappingURL=group-by.module.js.map