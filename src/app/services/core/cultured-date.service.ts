import { Injectable } from '@angular/core';
import { CultureService } from './culture.service';
import { IdentityService } from '../auth/identity.service';
import * as jalaliMoment from 'jalali-moment';

@Injectable({
  providedIn: 'root'
})
export class CulturedDateService {
  constructor(
    readonly cultureService: CultureService,
    private readonly identityService: IdentityService
  ) {}

  toString(value: string | Date, time?: boolean, format?: string) {
    if (!value) {
      return '';
    }
    value = new Date(value);
    format = format || (time ? 'jYYYY/jMM/jDD hh:mm:ss' : 'jYYYY/jMM/jDD');
    return jalaliMoment(value).format(format);
  }
}
