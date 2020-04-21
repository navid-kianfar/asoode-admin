import { Injectable } from '@angular/core';
import { CountryViewModel } from '../../view-models/core/general-types';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries: CountryViewModel[];

  constructor() {
    this.countries = [
      { id: 93, code: 'af', text: 'Afghanistan (‫افغانستان‬‎)' },
      { id: 355, code: 'al', text: 'Albania (Shqipëri)' },
      { id: 213, code: 'dz', text: 'Algeria (‫الجزائر‬‎)' },
      { id: 1684, code: 'as', text: 'American Samoa' },
      { id: 376, code: 'ad', text: 'Andorra' },
      { id: 244, code: 'ao', text: 'Angola' },
      { id: 1264, code: 'ai', text: 'Anguilla' },
      { id: 1268, code: 'ag', text: 'Antigua and Barbuda' },
      { id: 54, code: 'ar', text: 'Argentina' },
      { id: 374, code: 'am', text: 'Armenia (Հայաստան)' },
      { id: 297, code: 'aw', text: 'Aruba' },
      { id: 61, code: 'au', text: 'Australia' },
      { id: 43, code: 'at', text: 'Austria (Österreich)' },
      { id: 994, code: 'az', text: 'Azerbaijan (Azərbaycan)' },
      { id: 1242, code: 'bs', text: 'Bahamas' },
      { id: 973, code: 'bh', text: 'Bahrain (‫البحرين‬‎)' },
      { id: 880, code: 'bd', text: 'Bangladesh (বাংলাদেশ)' },
      { id: 1246, code: 'bb', text: 'Barbados' },
      { id: 375, code: 'by', text: 'Belarus (Беларусь)' },
      { id: 32, code: 'be', text: 'Belgium (België)' },
      { id: 501, code: 'bz', text: 'Belize' },
      { id: 229, code: 'bj', text: 'Benin (Bénin)' },
      { id: 1441, code: 'bm', text: 'Bermuda' },
      { id: 975, code: 'bt', text: 'Bhutan (འབྲུག)' },
      { id: 591, code: 'bo', text: 'Bolivia' },
      {
        id: 387,
        code: 'ba',
        text: 'Bosnia and Herzegovina (Босна и Херцеговина)',
      },
      { id: 267, code: 'bw', text: 'Botswana' },
      { id: 55, code: 'br', text: 'Brazil (Brasil)' },
      { id: 246, code: 'io', text: 'British Indian Ocean Territory' },
      { id: 1284, code: 'vg', text: 'British Virgin Islands' },
      { id: 673, code: 'bn', text: 'Brunei' },
      { id: 359, code: 'bg', text: 'Bulgaria (България)' },
      { id: 226, code: 'bf', text: 'Burkina Faso' },
      { id: 257, code: 'bi', text: 'Burundi (Uburundi)' },
      { id: 855, code: 'kh', text: 'Cambodia (កម្ពុជា)' },
      { id: 237, code: 'cm', text: 'Cameroon (Cameroun)' },
      { id: 1, code: 'ca', text: 'Canada' },
      { id: 238, code: 'cv', text: 'Cape Verde (Kabu Verdi)' },
      { id: 599, code: 'bq', text: 'Caribbean Netherlands' },
      { id: 1345, code: 'ky', text: 'Cayman Islands' },
      {
        id: 236,
        code: 'cf',
        text: 'Central African Republic (République centrafricaine)',
      },
      { id: 235, code: 'td', text: 'Chad (Tchad)' },
      { id: 56, code: 'cl', text: 'Chile' },
      { id: 86, code: 'cn', text: 'China (中国)' },
      { id: 61, code: 'cx', text: 'Christmas Island' },
      { id: 61, code: 'cc', text: 'Cocos (Keeling) Islands' },
      { id: 57, code: 'co', text: 'Colombia' },
      { id: 269, code: 'km', text: 'Comoros (‫جزر القمر‬‎)' },
      {
        id: 243,
        code: 'cd',
        text: 'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
      },
      { id: 242, code: 'cg', text: 'Congo (Republic) (Congo-Brazzaville)' },
      { id: 682, code: 'ck', text: 'Cook Islands' },
      { id: 506, code: 'cr', text: 'Costa Rica' },
      { id: 225, code: 'ci', text: 'Côte d’Ivoire' },
      { id: 385, code: 'hr', text: 'Croatia (Hrvatska)' },
      { id: 53, code: 'cu', text: 'Cuba' },
      { id: 599, code: 'cw', text: 'Curaçao' },
      { id: 357, code: 'cy', text: 'Cyprus (Κύπρος)' },
      { id: 420, code: 'cz', text: 'Czech Republic (Česká republika)' },
      { id: 45, code: 'dk', text: 'Denmark (Danmark)' },
      { id: 253, code: 'dj', text: 'Djibouti' },
      { id: 1767, code: 'dm', text: 'Dominica' },
      { id: 1, code: 'do', text: 'Dominican Republic (República Dominicana)' },
      { id: 593, code: 'ec', text: 'Ecuador' },
      { id: 20, code: 'eg', text: 'Egypt (‫مصر‬‎)' },
      { id: 503, code: 'sv', text: 'El Salvador' },
      { id: 240, code: 'gq', text: 'Equatorial Guinea (Guinea Ecuatorial)' },
      { id: 291, code: 'er', text: 'Eritrea' },
      { id: 372, code: 'ee', text: 'Estonia (Eesti)' },
      { id: 251, code: 'et', text: 'Ethiopia' },
      { id: 500, code: 'fk', text: 'Falkland Islands (Islas Malvinas)' },
      { id: 298, code: 'fo', text: 'Faroe Islands (Føroyar)' },
      { id: 679, code: 'fj', text: 'Fiji' },
      { id: 358, code: 'fi', text: 'Finland (Suomi)' },
      { id: 33, code: 'fr', text: 'France' },
      { id: 594, code: 'gf', text: 'French Guiana (Guyane française)' },
      { id: 689, code: 'pf', text: 'French Polynesia (Polynésie française)' },
      { id: 241, code: 'ga', text: 'Gabon' },
      { id: 220, code: 'gm', text: 'Gambia' },
      { id: 995, code: 'ge', text: 'Georgia (საქართველო)' },
      { id: 49, code: 'de', text: 'Germany (Deutschland)' },
      { id: 233, code: 'gh', text: 'Ghana (Gaana)' },
      { id: 350, code: 'gi', text: 'Gibraltar' },
      { id: 30, code: 'gr', text: 'Greece (Ελλάδα)' },
      { id: 299, code: 'gl', text: 'Greenland (Kalaallit Nunaat)' },
      { id: 1473, code: 'gd', text: 'Grenada' },
      { id: 590, code: 'gp', text: 'Guadeloupe' },
      { id: 1671, code: 'gu', text: 'Guam' },
      { id: 502, code: 'gt', text: 'Guatemala' },
      { id: 44, code: 'gg', text: 'Guernsey' },
      { id: 224, code: 'gn', text: 'Guinea (Guinée)' },
      { id: 245, code: 'gw', text: 'Guinea-Bissau (Guiné Bissau)' },
      { id: 592, code: 'gy', text: 'Guyana' },
      { id: 509, code: 'ht', text: 'Haiti' },
      { id: 504, code: 'hn', text: 'Honduras' },
      { id: 852, code: 'hk', text: 'Hong Kong (香港)' },
      { id: 36, code: 'hu', text: 'Hungary (Magyarország)' },
      { id: 354, code: 'is', text: 'Iceland (Ísland)' },
      { id: 91, code: 'in', text: 'India (भारत)' },
      { id: 62, code: 'id', text: 'Indonesia' },
      { id: 98, code: 'ir', text: 'Iran (‫ایران‬‎)' },
      { id: 964, code: 'iq', text: 'Iraq (‫العراق‬‎)' },
      { id: 353, code: 'ie', text: 'Ireland' },
      { id: 44, code: 'im', text: 'Isle of Man' },
      { id: 972, code: 'il', text: 'Israel (‫ישראל‬‎)' },
      { id: 39, code: 'it', text: 'Italy (Italia)' },
      { id: 1, code: 'jm', text: 'Jamaica' },
      { id: 81, code: 'jp', text: 'Japan (日本)' },
      { id: 44, code: 'je', text: 'Jersey' },
      { id: 962, code: 'jo', text: 'Jordan (‫الأردن‬‎)' },
      { id: 7, code: 'kz', text: 'Kazakhstan (Казахстан)' },
      { id: 254, code: 'ke', text: 'Kenya' },
      { id: 686, code: 'ki', text: 'Kiribati' },
      { id: 383, code: 'xk', text: 'Kosovo' },
      { id: 965, code: 'kw', text: 'Kuwait (‫الكويت‬‎)' },
      { id: 996, code: 'kg', text: 'Kyrgyzstan (Кыргызстан)' },
      { id: 856, code: 'la', text: 'Laos (ລາວ)' },
      { id: 371, code: 'lv', text: 'Latvia (Latvija)' },
      { id: 961, code: 'lb', text: 'Lebanon (‫لبنان‬‎)' },
      { id: 266, code: 'ls', text: 'Lesotho' },
      { id: 231, code: 'lr', text: 'Liberia' },
      { id: 218, code: 'ly', text: 'Libya (‫ليبيا‬‎)' },
      { id: 423, code: 'li', text: 'Liechtenstein' },
      { id: 370, code: 'lt', text: 'Lithuania (Lietuva)' },
      { id: 352, code: 'lu', text: 'Luxembourg' },
      { id: 853, code: 'mo', text: 'Macau (澳門)' },
      { id: 389, code: 'mk', text: 'Macedonia (FYROM) (Македонија)' },
      { id: 261, code: 'mg', text: 'Madagascar (Madagasikara)' },
      { id: 265, code: 'mw', text: 'Malawi' },
      { id: 60, code: 'my', text: 'Malaysia' },
      { id: 960, code: 'mv', text: 'Maldives' },
      { id: 223, code: 'ml', text: 'Mali' },
      { id: 356, code: 'mt', text: 'Malta' },
      { id: 692, code: 'mh', text: 'Marshall Islands' },
      { id: 596, code: 'mq', text: 'Martinique' },
      { id: 222, code: 'mr', text: 'Mauritania (‫موريتانيا‬‎)' },
      { id: 230, code: 'mu', text: 'Mauritius (Moris)' },
      { id: 262, code: 'yt', text: 'Mayotte' },
      { id: 52, code: 'mx', text: 'Mexico (México)' },
      { id: 691, code: 'fm', text: 'Micronesia' },
      { id: 373, code: 'md', text: 'Moldova (Republica Moldova)' },
      { id: 377, code: 'mc', text: 'Monaco' },
      { id: 976, code: 'mn', text: 'Mongolia (Монгол)' },
      { id: 382, code: 'me', text: 'Montenegro (Crna Gora)' },
      { id: 1664, code: 'ms', text: 'Montserrat' },
      { id: 212, code: 'ma', text: 'Morocco (‫المغرب‬‎)' },
      { id: 258, code: 'mz', text: 'Mozambique (Moçambique)' },
      { id: 95, code: 'mm', text: 'Myanmar (Burma) (မြန်မာ)' },
      { id: 264, code: 'na', text: 'Namibia (Namibië)' },
      { id: 674, code: 'nr', text: 'Nauru' },
      { id: 977, code: 'np', text: 'Nepal (नेपाल)' },
      { id: 31, code: 'nl', text: 'Netherlands (Nederland)' },
      { id: 687, code: 'nc', text: 'New Caledonia (Nouvelle-Calédonie)' },
      { id: 64, code: 'nz', text: 'New Zealand' },
      { id: 505, code: 'ni', text: 'Nicaragua' },
      { id: 227, code: 'ne', text: 'Niger (Nijar)' },
      { id: 234, code: 'ng', text: 'Nigeria' },
      { id: 683, code: 'nu', text: 'Niue' },
      { id: 672, code: 'nf', text: 'Norfolk Island' },
      { id: 850, code: 'kp', text: 'North Korea (조선 민주주의 인민 공화국)' },
      { id: 1670, code: 'mp', text: 'Northern Mariana Islands' },
      { id: 47, code: 'no', text: 'Norway (Norge)' },
      { id: 968, code: 'om', text: 'Oman (‫عُمان‬‎)' },
      { id: 92, code: 'pk', text: 'Pakistan (‫پاکستان‬‎)' },
      { id: 680, code: 'pw', text: 'Palau' },
      { id: 970, code: 'ps', text: 'Palestine (‫فلسطين‬‎)' },
      { id: 507, code: 'pa', text: 'Panama (Panamá)' },
      { id: 675, code: 'pg', text: 'Papua New Guinea' },
      { id: 595, code: 'py', text: 'Paraguay' },
      { id: 51, code: 'pe', text: 'Peru (Perú)' },
      { id: 63, code: 'ph', text: 'Philippines' },
      { id: 48, code: 'pl', text: 'Poland (Polska)' },
      { id: 351, code: 'pt', text: 'Portugal' },
      { id: 1, code: 'pr', text: 'Puerto Rico' },
      { id: 974, code: 'qa', text: 'Qatar (‫قطر‬‎)' },
      { id: 262, code: 're', text: 'Réunion (La Réunion)' },
      { id: 40, code: 'ro', text: 'Romania (România)' },
      { id: 7, code: 'ru', text: 'Russia (Россия)' },
      { id: 250, code: 'rw', text: 'Rwanda' },
      { id: 590, code: 'bl', text: 'Saint Barthélemy' },
      { id: 290, code: 'sh', text: 'Saint Helena' },
      { id: 1869, code: 'kn', text: 'Saint Kitts and Nevis' },
      { id: 1758, code: 'lc', text: 'Saint Lucia' },
      {
        id: 590,
        code: 'mf',
        text: 'Saint Martin (Saint-Martin (partie française))',
      },
      {
        id: 508,
        code: 'pm',
        text: 'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
      },
      { id: 1784, code: 'vc', text: 'Saint Vincent and the Grenadines' },
      { id: 685, code: 'ws', text: 'Samoa' },
      { id: 378, code: 'sm', text: 'San Marino' },
      {
        id: 239,
        code: 'st',
        text: 'São Tomé and Príncipe (São Tomé e Príncipe)',
      },
      {
        id: 966,
        code: 'sa',
        text: 'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
      },
      { id: 221, code: 'sn', text: 'Senegal (Sénégal)' },
      { id: 381, code: 'rs', text: 'Serbia (Србија)' },
      { id: 248, code: 'sc', text: 'Seychelles' },
      { id: 232, code: 'sl', text: 'Sierra Leone' },
      { id: 65, code: 'sg', text: 'Singapore' },
      { id: 1721, code: 'sx', text: 'Sint Maarten' },
      { id: 421, code: 'sk', text: 'Slovakia (Slovensko)' },
      { id: 386, code: 'si', text: 'Slovenia (Slovenija)' },
      { id: 677, code: 'sb', text: 'Solomon Islands' },
      { id: 252, code: 'so', text: 'Somalia (Soomaaliya)' },
      { id: 27, code: 'za', text: 'South Africa' },
      { id: 82, code: 'kr', text: 'South Korea (대한민국)' },
      { id: 211, code: 'ss', text: 'South Sudan (‫جنوب السودان‬‎)' },
      { id: 34, code: 'es', text: 'Spain (España)' },
      { id: 94, code: 'lk', text: 'Sri Lanka (ශ්‍රී ලංකාව)' },
      { id: 249, code: 'sd', text: 'Sudan (‫السودان‬‎)' },
      { id: 597, code: 'sr', text: 'Suriname' },
      { id: 47, code: 'sj', text: 'Svalbard and Jan Mayen' },
      { id: 268, code: 'sz', text: 'Swaziland' },
      { id: 46, code: 'se', text: 'Sweden (Sverige)' },
      { id: 41, code: 'ch', text: 'Switzerland (Schweiz)' },
      { id: 963, code: 'sy', text: 'Syria (‫سوريا‬‎)' },
      { id: 886, code: 'tw', text: 'Taiwan (台灣)' },
      { id: 992, code: 'tj', text: 'Tajikistan' },
      { id: 255, code: 'tz', text: 'Tanzania' },
      { id: 66, code: 'th', text: 'Thailand (ไทย)' },
      { id: 670, code: 'tl', text: 'Timor-Leste' },
      { id: 228, code: 'tg', text: 'Togo' },
      { id: 690, code: 'tk', text: 'Tokelau' },
      { id: 676, code: 'to', text: 'Tonga' },
      { id: 1868, code: 'tt', text: 'Trinidad and Tobago' },
      { id: 216, code: 'tn', text: 'Tunisia (‫تونس‬‎)' },
      { id: 90, code: 'tr', text: 'Turkey (Türkiye)' },
      { id: 993, code: 'tm', text: 'Turkmenistan' },
      { id: 1649, code: 'tc', text: 'Turks and Caicos Islands' },
      { id: 688, code: 'tv', text: 'Tuvalu' },
      { id: 1340, code: 'vi', text: 'U.S. Virgin Islands' },
      { id: 256, code: 'ug', text: 'Uganda' },
      { id: 380, code: 'ua', text: 'Ukraine (Україна)' },
      {
        id: 971,
        code: 'ae',
        text: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
      },
      { id: 44, code: 'gb', text: 'United Kingdom' },
      { id: 1, code: 'us', text: 'United States' },
      { id: 598, code: 'uy', text: 'Uruguay' },
      { id: 998, code: 'uz', text: 'Uzbekistan (Oʻzbekiston)' },
      { id: 678, code: 'vu', text: 'Vanuatu' },
      { id: 39, code: 'va', text: 'Vatican City (Città del Vaticano)' },
      { id: 58, code: 've', text: 'Venezuela' },
      { id: 84, code: 'vn', text: 'Vietnam (Việt Nam)' },
      { id: 681, code: 'wf', text: 'Wallis and Futuna (Wallis-et-Futuna)' },
      { id: 212, code: 'eh', text: 'Western Sahara (‫الصحراء الغربية‬‎)' },
      { id: 967, code: 'ye', text: 'Yemen (‫اليمن‬‎)' },
      { id: 260, code: 'zm', text: 'Zambia' },
      { id: 263, code: 'zw', text: 'Zimbabwe' },
      { id: 358, code: 'ax', text: 'Åland Islands' },
    ];
  }
}
