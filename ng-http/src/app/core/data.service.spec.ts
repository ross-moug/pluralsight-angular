import { BookTrackerError } from './../models/bookTrackerError';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { Book } from './../models/book';
import { DataService } from './data.service';

describe('DataService', () => {
  const books: Book[] = [
    { bookID: 1, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J. K. Rowling', publicationYear: 1997 },
    { bookID: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J. K. Rowling', publicationYear: 1998 },
    { bookID: 3, title: 'Harry Potter and the Prisoner of Azkaban', author: 'J. K. Rowling', publicationYear: 1999 },
  ];

  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService,
      ],
    });

    service = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should GET all books', () => {
    service.getAllBooks()
      .subscribe(
        data => expect(data).toEqual(books)
      );

    const mockRequest: TestRequest = httpTestingController.expectOne('/api/books');

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(books);
  });

  it('should convert error to BookTrackerError', () => {
    service.getAllBooks()
      .subscribe(
        () => fail('should have been an error'),
        (error: BookTrackerError) => {
          expect(error.errorNumber).toEqual(100);
          expect(error.friendlyMessage).toEqual('An error occurred retrieving data');
        }
      );

    const mockRequest: TestRequest = httpTestingController.expectOne('/api/books');

    mockRequest.flush(books, {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
