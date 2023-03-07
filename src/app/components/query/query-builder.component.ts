import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AirtableDataService } from '../../services/airtable.data.service';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
  queryForm: FormGroup;
  operators = ['AND', 'OR'];
  conditions = [
    { value: 'name', display: 'Name' },
    { value: 'city', display: 'City' },
    { value: 'notes', display: 'Notes' }
  ];
  records$: Observable<any>;

  constructor(private fb: FormBuilder, private airtableService: AirtableDataService) { }

  ngOnInit(): void {
    this.queryForm = this.fb.group({
      operator: ['AND', Validators.required],
      conditions: this.fb.array([this.createCondition()])
    });
  }

  createCondition(): FormGroup {
    return this.fb.group({
      field: ['', Validators.required],
      operator: ['contains', Validators.required],
      value: ['', Validators.required]
    });
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  removeCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  search(): void {
    const filter = this.buildFilter();
    this.records$ = this.airtableService.getRecordsByFilter('MyTable', filter);
  }

  buildFilter(): string {
    let filter = '';
    this.conditions.controls.forEach((condition: FormGroup, index: number) => {
      if (index > 0) {
        filter += ` ${this.queryForm.get('operator').value} `;
      }
      filter += `{${condition.get('field').value}}`;
      filter += ` ${condition.get('operator').value} `;
      filter += `"${condition.get('value').value}"`;
    });
    return filter;
  }
}
