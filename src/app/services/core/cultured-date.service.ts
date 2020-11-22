import { Injectable } from '@angular/core';
import { CultureService } from './culture.service';
import * as jalaliMoment from 'jalali-moment';

@Injectable({
  providedIn: 'root',
})
export class CulturedDateService {
  constructor(readonly cultureService: CultureService) {}

  toString(value: string | Date, time?: boolean, format?: string) {
    if (!value) {
      return '';
    }
    value = new Date(value);
    format = format || (time ? 'jYYYY/jMM/jDD hh:mm:ss' : 'jYYYY/jMM/jDD');
    return jalaliMoment(value).format(format);
  }
}
