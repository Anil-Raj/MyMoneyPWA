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
    flyInOut10: trigger('flyInOut', [
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
    ])

}
