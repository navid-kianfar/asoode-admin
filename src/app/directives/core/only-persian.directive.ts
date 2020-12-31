import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificationService } from '../../services/core/notification.service';

@Directive({
  selector: '[appOnlyPersian]'
})
export class OnlyPersianDirective implements OnInit {
  constructor(
    readonly elementRef: ElementRef,
    readonly detector: DeviceDetectorService,
    readonly notificationService: NotificationService
  ) {}

  @Input() appOnlyPersian: boolean;

  ngOnInit(): void {
    if (!this.appOnlyPersian) {
      return;
    }

    this.setInputFilter(this.elementRef.nativeElement, value => {
      const valid =
        !value ||
        /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F ]+$/.test(value);

      if (!valid) {
        this.notificationService.info('ONLY_PERSIAN');
      }

      return valid;
    });
  }

  setInputFilter(textbox, inputFilter) {
    [
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mouseup',
      'select',
      'contextmenu',
      'drop'
    ].forEach(event => {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty('oldValue')) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = '';
        }
      });
    });
  }
}
