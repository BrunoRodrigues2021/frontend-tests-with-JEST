import {Component, OnInit} from '@angular/core';
import {FakeService} from "../services/fake.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  serviceData: any;
  errorMessage: any;
  status: boolean = false;

  constructor(private fakeService: FakeService) {}

  ngOnInit(): void {
    this.getDataFromFakeService();
  }

  getDataFromFakeService() {
    this.fakeService.getData().subscribe({
      next: data => {
        this.serviceData = data;
      },
      error: err => {
        this.errorMessage = err.statusText;
      }
    });
  }

  methodToThrowAnException() {
    throw new Error ('Exception test');
  }

  changeStatus() {
    this.status = !this.status;
  }

}
