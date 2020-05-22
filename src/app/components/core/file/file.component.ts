import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownKnownList } from '../../../library/core/enums';
import { ListViewModel } from '../../../view-models/core/list-types';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() placeHolder: string;
  @Input() model: File|File[];

  @Output() modelChange = new EventEmitter<File|File[]>();
  constructor() {}

  ngOnInit() {}
}
