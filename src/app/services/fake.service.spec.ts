import {FakeService} from './fake.service';
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {URL} from "./fake-constants";

describe('FakeService', () => {
  let fakeService: FakeService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    }

    fakeService = new FakeService(httpClientSpy);
  });

  describe('Success cases', () => {

    it('should be created', () => {
      expect(fakeService).toBeTruthy();
    });

    it('should successfully fetch data from fake service', () => {
      const mockedData = {
        "id": 1,
        "name": "Bruno",
      }

      jest.spyOn(httpClientSpy, 'get').mockReturnValueOnce(of(mockedData));

      fakeService.getData().subscribe(
        {
          next: data => {
            expect(data).toEqual(mockedData);
          },
          error: error => console.log(error)
        }
      );

      expect(httpClientSpy.get).toBeCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(URL);
    });

    it('should successfully create fake data', () => {
      const mockedData = {
        "name": "Clóvis"
      };
      const res = 'response_test';

      jest.spyOn(httpClientSpy, 'post').mockReturnValueOnce(of(res));

      fakeService.createData(mockedData);

      expect(httpClientSpy.post).toBeCalledTimes(1);
    });

  });

  describe('Failure cases', () => {

    it('should throw an error when trying to get data from fake service', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Generic error',
        status: 500,
        statusText: 'GENERIC ERROR'
      });

      jest.spyOn(httpClientSpy, 'get').mockReturnValueOnce(throwError(() => errorResponse));

      fakeService.getData().subscribe(
        {
          error: error => {
            expect(error.error).toEqual(errorResponse.error);
            expect(error.status).toEqual(errorResponse.status);
            expect(error.statusText).toEqual(errorResponse.statusText);
          }
        }
      );

      expect(httpClientSpy.get).toBeCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(URL);
    });

  });
});
