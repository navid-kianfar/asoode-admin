import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NumberHelpers } from '../../helpers/number.helpers';

@Directive({
  selector: 'input[appOnlyNumber]'
})
export class OnlyNumberDirective implements OnInit {
  constructor(
    readonly elementRef: ElementRef,
    readonly detector: DeviceDetectorService
  ) {}

  @Input() appOnlyNumber: boolean;
  @Input() appDecimalNumber: boolean;

  ngOnInit(): void {
    if (!this.detector.isDesktop() && this.appOnlyNumber) {
      this.elementRef.nativeElement.setAttribute('pattern', '[0-9]*');
      this.elementRef.nativeElement.setAttribute('inputmode', 'numeric');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): boolean {
    if (!this.appOnlyNumber) {
      return true;
    }
    return e.keyCode === 8 ||
      e.keyCode === 9 ||
      e.keyCode === 37 ||
      e.keyCode === 39 ||
      (this.appDecimalNumber && e.key === '.')
      ? true
      : /^-?\d*[.,]?\d*$/.test(e.key) ||
          /[٠-٩]|\./.test(e.key) ||
          /[۰-۹]|\./.test(e.key);
  }
}
