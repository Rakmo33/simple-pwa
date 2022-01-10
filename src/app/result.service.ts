import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private db: any;
  constructor(private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);
    this.createDatabase();
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe((online) => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        // this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    this.db.version(1).stores({
      results: 'name,email,marks',
    });
  }
  private addToIndexedDb(result: {
    name: string;
    email: string;
    marks: number;
  }) {
    this.db.results
      .add(result)
      .then(async () => {
        const allItems = await this.db.results.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: { stack: any }) => {
        alert('Error: ' + (e.stack || e));
      });
  }

  getMarks(result: { name: string; email: string; marks: number }) {
    if (!this.onlineOfflineService.isOnline) {
      this.addToIndexedDb(result);
    } else {
      //TODO: fetch from API
    }
  }
}
