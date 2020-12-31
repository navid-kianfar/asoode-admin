import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appWaitingButton]'
})
export class WaitingButtonDirective implements OnChanges{

  @Input() appWaitingButton: boolean;
  constructor(
    readonly elementRef: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appWaitingButton) {
      const button: HTMLButtonElement = this.elementRef.nativeElement;
      if (changes.appWaitingButton.currentValue) {
        const i = document.createElement('I');
        i.style.verticalAlign = 'inherit';
        i.style.fontSize = '1.3rem';
        i.classList.add('i-Loading-3', 'icon-spin');
        button.appendChild(i);
        button.disabled = true;
      } else {
        const icon = button.querySelector('i');
       if (icon) { icon.remove(); }
       button.disabled = false;
      }
    }
  }
}
