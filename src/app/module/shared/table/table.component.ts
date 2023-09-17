import {Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit {
  @Input()
  dataSource?: any[]
  @Input()
  headers?: TableColumnHeader[]
  @ContentChild("actions", {static: true})
  actions?: TemplateRef<any>
  @ContentChild("search", {static: true})
  search?: TemplateRef<any>
  @Input()
  title?: string;
  selectedRow=[];
  @Input()
  cols: any[] = [];
  @ViewChild('dt') dt: any;
  ngOnInit(): void {
    if (!this.headers && this.dataSource) {
      if (this.dataSource[0]) {
        this.headers = Object.keys(this.dataSource[0]).map(key => ({
          dataKey: key
        }))
      }
    }

  }

}
