"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// animations.ts
var core_1 = require("@angular/core");
exports.Animations = {
    animeTrigger: core_1.trigger('animeTrigger', [
        core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
        core_1.transition('void => *', [
            core_1.animate(700, core_1.keyframes([
                core_1.style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
                core_1.style({ opacity: 1, transform: 'translateY(25px)', offset: 0.3 }),
                core_1.style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
            ]))
        ])
    ]),
    flyInOut: core_1.trigger('flyInOut', [
        core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
        core_1.transition('void => *', [
            core_1.style({ transform: 'translateY(100%)' }),
            core_1.animate(500)
        ]),
        core_1.transition('* => void', [
            core_1.animate(100, core_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    flyInOut10: core_1.trigger('flyInOut10', [
        core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
        core_1.transition('void => *', [
            core_1.style({ transform: 'translateY(10%)' }),
            core_1.animate(500)
        ]),
        core_1.transition('* => void', [
            core_1.animate(100, core_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    slideUp: core_1.trigger('slideUp', [
        core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
        core_1.transition('void => *', [
            core_1.style({ transform: 'translateY(100%)' }),
            core_1.animate('.3s ease-out')
        ]),
        core_1.transition('* => void', [
            core_1.animate(500, core_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    vibrate: core_1.trigger('vibrate', [
        core_1.transition('false=>true', core_1.animate(1000, core_1.keyframes([
            core_1.style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
            core_1.style({ transform: 'translate3d(-10px, 0, 0', offset: 0.05 }),
            core_1.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.1 }),
            core_1.style({ transform: 'translate3d(-10px, 0, 0', offset: 0.15 }),
            core_1.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
            core_1.style({ transform: 'translate3d(-10px, 0, 0', offset: 0.25 }),
            core_1.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.3 }),
            core_1.style({ transform: 'translate3d(-10px, 0, 0', offset: 0.35 }),
            core_1.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
            core_1.style({ transform: 'translate3d(-10px, 0, 0', offset: 0.45 }),
            core_1.style({ transform: 'translate3d(0, 0, 0)', offset: .5 }),
        ]))),
    ]),
    slideLeft: core_1.trigger('slideLeft', [
        core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
        core_1.transition('void => *', [
            core_1.style({ transform: 'translateX(100%)' }),
            core_1.animate('.3s ease-out')
        ]),
        core_1.transition('* => void', [
            core_1.animate(500, core_1.style({ transform: 'translateX(-100%)' }))
        ])
    ])
};
//# sourceMappingURL=animations.js.map