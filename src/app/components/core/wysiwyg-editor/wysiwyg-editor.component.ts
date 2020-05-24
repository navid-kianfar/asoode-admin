import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CultureService } from '../../../services/core/culture.service';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss'],
})
export class WysiwygEditorComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() model: string;
  @Input() placeHolder: string;
  @Output() modelChange = new EventEmitter<string>();
  constructor(readonly cultureService: CultureService) {}

  ngOnInit() {}

  textChange($event: any) {
    this.model = $event;
    this.modelChange.emit(this.model);
  }
}
