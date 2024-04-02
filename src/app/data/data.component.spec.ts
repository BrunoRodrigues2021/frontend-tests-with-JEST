import {of, throwError} from "rxjs";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DataComponent} from './data.component';
import {HttpErrorResponse} from "@angular/common/http";
import {FakeService} from "../services/fake.service";

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  beforeEach(() => {
    fakeServiceMock = {
      getData: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [
        {
          provide: FakeService, useValue: fakeServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  describe('Success cases', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should successfully change status after clicking the button', () => {
      component.changeStatus();

      expect(component.status).toBe(true);
    })

    it('should successfully get data from fake service', () => {
      const expectedResponse = {
        "id": 1,
        "name": "Bruno",
      }

      jest.spyOn(fakeServiceMock, 'getData').mockReturnValueOnce(of(expectedResponse));

      // fixture.detectChanges();
      component.getDataFromFakeService();

      expect(component.serviceData.id).toBe(expectedResponse.id);
      expect(component.serviceData.name).toBe(expectedResponse.name);
    });

  });

  describe('Failure cases', () => {

    it('should throw an exception', () => {
      expect(() => component.methodToThrowAnException()).toThrow();
      expect(() => component.methodToThrowAnException()).toThrow(Error);
      expect(() => component.methodToThrowAnException()).toThrow('Exception test');
    });

    it('should throw an error when trying to get data from fake service', () => {
      const expectedErrorResponse = new HttpErrorResponse({
        error: 'generic error',
        status: 500,
        statusText: 'INTERNAL_SERVER_ERROR'
      });

      jest.spyOn(fakeServiceMock, 'getData').mockReturnValueOnce(throwError(() => expectedErrorResponse));

      // fixture.detectChanges();
      component.getDataFromFakeService();

      expect(component.errorMessage).toBe(expectedErrorResponse.statusText);
    });

  });
});
