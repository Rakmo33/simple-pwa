import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnlineOfflineService } from './online-offline.service';
import { ResultService } from './result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-Online-Offline-Sync';
  marks = 0;
  name = '';
  email = '';

  constructor(
    private readonly resultService: ResultService,
    public readonly onlineOfflineService: OnlineOfflineService
  ) {}

  getResult(formRef: NgForm) {
    console.log('Form Submitted!', formRef.value);

    this.name = formRef.value.name;
    this.email = formRef.value.email;
    this.marks += 1;

    this.resultService.getMarks({
      name: this.name,
      email: this.email,
      marks: this.marks,
    });

    formRef.reset();
  }
}
