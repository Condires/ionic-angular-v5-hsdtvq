import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Base, Table } from '@airtable/blocks/models';
import {RecordData, RecordId} from '@airtable/blocks/types/record';
import { initializeBlock, useBase } from '@airtable/blocks/ui';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirtableDataService {

  private base: Base;

  constructor() {
    this.base = useBase();
  }

  createRecord(tableId: string, data: RecordData): Observable<RecordData> {
    const table = this.base.getTableByIdIfExists(tableId);
    if (!table) {
      throw new Error(`Table with ID "${tableId}" does not exist`);
    }

    return from(table.createRecordAsync(data)).map(record => record._data);
  }

  retrieveRecords(tableId: string, query?: object): Observable<RecordData[]> {
    const table = this.base.getTableByIdIfExists(tableId);
    if (!table) {
      throw new Error(`Table with ID "${tableId}" does not exist`);
    }

    return from(table.select(query).all()).map(records => records.map(record => record._data));
  }

  updateRecord(tableId: string, recordId: string, data: RecordData): Observable<RecordData> {
    const table = this.base.getTableByIdIfExists(tableId);
    if (!table) {
      throw new Error(`Table with ID "${tableId}" does not exist`);
    }

    return from(table.updateRecordAsync(recordId, data)).map(record => record._data);
  }

  deleteRecord(tableId: string, recordId: string): Observable<void> {
    const table = this.base.getTableByIdIfExists(tableId);
    if (!table) {
      throw new Error(`Table with ID "${tableId}" does not exist`);
    }

    return from(table.deleteRecordAsync(recordId));
  }
}
