import {
  Component,
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
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpService } from '../../../services/core/http.service';
import { EnumsService } from '../../../services/core/enums.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';

@Component({
  selector: 'app-droptree',
  templateUrl: './droptree.component.html',
  styleUrls: ['./droptree.component.scss']
})
export class DroptreeComponent implements OnInit, OnChanges {
  @Input() cssClass: 'custom-color' | string;
  @Input() disabled: boolean;
  @Input() allowClear: boolean;
  @Input() choose: boolean;
  @Input() chooseLabel: string;
  @Input() waiting: boolean;
  @Input() ltr: boolean;
  @Input() backend: string;
  @Input() backendParams: any;
  @Input() prependIcon: string;
  @Input() model: any;
  @Input() items: ListViewModel[];

  @Output() picked = new EventEmitter<any>();
  @Output() modelChange = new EventEmitter<any>();
  @Output() itemsChange = new EventEmitter<ListViewModel[]>();
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  showPlate: boolean;
  selectedItem: any;
  constructor(
    private readonly httpService: HttpService,
    private readonly enumsService: EnumsService
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
    this.items = val;
    this.itemsChange.emit(val);
    this.refreshDataSource();
  }

  updateModel(val) {
    this.model = val;
    this.modelChange.emit(val);
    this.picked.emit(val);
  }
  get text(): string {
    const item = (this.items || []).find(i => i.value === this.model);
    if (item) {
      return item.text;
    }
    return this.chooseLabel || 'PLEASE_CHOOSE';
  }

  closePlate() {
    if (this.trigger) {
      this.trigger.closeMenu();
    }
  }

  ngOnInit() {
    this.items = this.items || [];
    if (this.choose) {
      const def = {
        value: undefined,
        separator: false,
        text: this.chooseLabel || 'PLEASE_CHOOSE'
      };
      this.items.unshift(def);
      if (this.model === undefined) {
        this.onPick(def, null);
      }
    }
    if (this.model && !this.selectedItem) {
      const found = this.items.find(i => i.value === this.model);
      if (found) {
        this.onPick(found, null);
      }
    }
    if (this.backend) {
      this.load();
    }
    this.refreshDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.backend && this.backend) {
      this.load();
      this.selectedItem = undefined;
      if (!changes.backend.firstChange) {
        this.model = undefined;
      }
    }
    if (changes.items && !changes.items.firstChange) {
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

  toggle() {
    if (this.disabled) {
      return;
    }
    if (this.trigger) {
      this.trigger.toggleMenu();
    }
  }

  onPick(item: ListViewModel, $event: MouseEvent, trigger: boolean = false) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    if (this.disabled) {
      return;
    }
    this.selectedItem = item;
    if (this.trigger) {
      this.trigger.closeMenu();
    }
    if (trigger) {
      this.updateModel(item.value);
    }
  }

  compare(item: ListViewModel) {
    return this.model === item.value;
  }

  clear($event?: Event) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.trigger) {
      this.trigger.closeMenu();
    }
    this.selectedItem = undefined;
    this.model = undefined;
    this.modelChange.emit(undefined);
  }

  checkSelectedItem() {
    if (this.model) {
      const found = this.items.find(i => i.value === this.model);
      if (found) {
        this.onPick(found, null);
      }
    }
  }

  pickNode(node: any) {
    const found = this.items.find(i => i.value === node.value);
    this.onPick(found, null, true);
  }
}
