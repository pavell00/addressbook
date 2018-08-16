import { Directive, ElementRef, Renderer2, Renderer, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[green]',
})
export class GreenDirective implements AfterViewInit {
    
    private element: HTMLElement;

    constructor(private el: ElementRef, renderer2: Renderer2, renderer: Renderer ){
        
        //renderer2.setStyle(el.nativeElement, 'display', 'none');
        renderer.setElementStyle(el.nativeElement, 'display', 'none');
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.style.backgroundColor = 'green';
        this.el.nativeElement.style.color = 'blue';
        //this.elRef.nativeElement.style.fontSize = '20px';
     }
}