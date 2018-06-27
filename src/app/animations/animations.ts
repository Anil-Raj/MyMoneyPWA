// animations.ts
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const Animations = {
    animeTrigger: trigger('animeTrigger', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            animate(700, keyframes([
                style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateY(25px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
            ]))
        ])
    ]),
    flyInOut: trigger('flyInOut', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            style({ transform: 'translateY(100%)' }),
            animate(500)
        ]),
        transition('* => void', [
            animate(100, style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    flyInOut10: trigger('flyInOut10', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            style({ transform: 'translateY(10%)' }),
            animate(500)
        ]),
        transition('* => void', [
            animate(100, style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    slideUp: trigger('slideUp', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            style({ transform: 'translateY(100%)' }),
            animate('.3s ease-out')
        ]),
        transition('* => void', [
            animate(500, style({ transform: 'translateY(-100%)' }))
        ])
    ]),
    vibrate: trigger('vibrate', [
        transition('false=>true', animate(1000, keyframes([
            style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
            style({ transform: 'translate3d(-10px, 0, 0', offset: 0.05 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(-10px, 0, 0', offset: 0.15 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
            style({ transform: 'translate3d(-10px, 0, 0', offset: 0.25 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.3 }),
            style({ transform: 'translate3d(-10px, 0, 0', offset: 0.35 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
            style({ transform: 'translate3d(-10px, 0, 0', offset: 0.45 }),
            style({ transform: 'translate3d(0, 0, 0)', offset: .5 }),
        ]))),
    ]),
    slideLeft: trigger('slideLeft', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            style({ transform: 'translateX(100%)' }),
            animate('.3s ease-out')
        ]),
        transition('* => void', [
            animate(500, style({ transform: 'translateX(-100%)' }))
        ])
    ])

};
