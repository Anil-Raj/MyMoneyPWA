// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[autosize]'
// })
// export class AutoSizeDirective {

//   constructor() { }

// }
import { ElementRef, HostListener, Directive, AfterContentChecked, NgModule } from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;
@Directive({
    selector: '[autosize]'
})

export class AutoSizeDirective implements AfterContentChecked {
    @HostListener('input', ['$event.target'])
    private textAreaEl: any;
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    constructor(public element: ElementRef) {

        this.textAreaEl = this.element.nativeElement;
    }
    ngAfterContentChecked(): void {
        this.adjust();
    }
    adjust(): void {
        if (this.textAreaEl) {
            this.textAreaEl.style.overflow = 'hidden';
            this.textAreaEl.style.height = 'auto';
            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    }
}

@NgModule({
    declarations: [AutoSizeDirective],
    exports: [AutoSizeDirective]
})
export class AutoSizeModule {

}
