import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

    visible: boolean;
    groupBy = new BehaviorSubject< string>('categoryName');
     confirmMission(groupBy: string) {
        this.groupBy.next(groupBy);
      }

    constructor() { this.visible = false; }

    hide() { this.visible = false; }

    show() { this.visible = true; }

    toggle() { this.visible = !this.visible; }

    doSomethingElseUseful() { }

}
