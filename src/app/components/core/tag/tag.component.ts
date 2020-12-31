import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  DropdownKnownList,
  OperationResultStatus
} from '../../../library/core/enums';
import { ListViewModel } from '../../../view-models/core/list-types';
import { HttpService } from '../../../services/core/http.service';
import { EnumsService } from '../../../services/core/enums.service';
import { MatChipEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TranslateService } from '../../../services/core/translate.service';
import { NotificationService } from '../../../services/core/notification.service';
import { StringHelpers } from '../../../helpers/string.helpers';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() filter: (item) => boolean;
  @Input() max: number;
  @Input() cssClass: string;
  @Input() tree: boolean;
  @Input() disabled: boolean;
  @Input() placeHolder: string;
  @Input() enum: string;
  @Input() enumExcept: any[];
  @Input() waiting: boolean;
  @Input() ltr: boolean;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() prependIcon: string;
  @Input() model: any[];
  @Input() items: ListViewModel[];
  @Input() filtered: ListViewModel[];
  @Output() picked = new EventEmitter<any>();
  @Output() modelChange = new EventEmitter<any[]>();
  @Output() itemsChange = new EventEmitter<ListViewModel[]>();

  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private readonly httpService: HttpService,
    private readonly enumsService: EnumsService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {}
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: any, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        value: node.value,
        parentId: node.parentId,
        level
      };
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  refreshDataSource() {
    this.dataSource.data = this.makeTree(1, null);
  }

  private makeTree(level: number, parentId: string = null): any[] {
    return this.items
      .filter(c => c.payload && c.payload.parentId === parentId)
      .map(c => {
        const hasChild = this.items.some(x => x.payload.parentId === c.value);
        return {
          level,
          name: c.text,
          value: c.value,
          parentId: c.payload.parentId,
          createdAt: new Date(c.payload.createdAt).getTime(),
          children: hasChild ? this.makeTree(level + 1, c.value) : []
        };
      });
  }

  updateItems(val) {
    if (this.filter) {
      val = this.filter(val || []);
    }
    this.items = val;
    this.itemsChange.emit(val);
    this.refreshDataSource();
  }

  ngOnInit() {
    this.items = this.items || [];
    this.filtered = [...this.items];
    if (this.enum) {
      const items = [];
      this.enumExcept = this.enumExcept || [];
      const enumObj = this.enumsService.repository[
        this.enum[0].toLowerCase() + this.enum.substring(1)
      ];
      Object.keys(enumObj).forEach(key => {
        const changed = key
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/-/g, '_');
        const enumChanged = this.enum
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/-/g, '_');
        const text = `ENUMS_${enumChanged}_${changed}`.toUpperCase();
        if (this.enumExcept.indexOf(enumObj[key]) !== -1) {
          return;
        }
        items.push({ text, separator: false, value: enumObj[key] });
      });
      this.items = items;
    }
    if (this.backend) {
      this.load();
    }
    this.refreshDataSource();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.backend && this.backend) {
      this.load();
      this.filtered = [];
      if (!changes.backend.firstChange) {
        this.model = [];
      }
    }
    if (changes.items && !changes.items.firstChange) {
      this.filtered = [...changes.items.currentValue];
      this.refreshDataSource();
    }
  }

  async load() {
    this.disabled = true;
    const op = await this.httpService.post<ListViewModel[]>(
      this.backend,
      this.backendParams
    );
    this.disabled = false;
    if (op.status === OperationResultStatus.Success) {
      this.updateItems(op.data);
      this.checkSelectedItem();
    }
  }
  checkSelectedItem() {
    if (this.model) {
      const items = this.items.find(i => this.model.indexOf(i.value) !== -1);
      // if (items) {
      //   this.onPick(found, null);
      // }
    }
  }
  pickNode($event: ListViewModel) {
    if (this.disabled) {
      return;
    }
    if (this.model.indexOf($event.value) !== -1) {
      return;
    }
    if (this.max && this.model.length === this.max) {
      const msg = StringHelpers.format(
        this.translateService.fromKey('YOU_CAN_CHOOSE'),
        [this.max]
      );
      this.notificationService.warning(msg);
      return;
    }
    this.model.push($event.value);
  }
  itemRemoved(obj: any) {
    this.model = this.model.filter(f => f !== obj.chip.value);
    this.modelChange.emit(this.model);
  }
}
