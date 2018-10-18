import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs/internal/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Hero } from './hero';

describe('HeroService', () => {
  const heroes: Hero[] = [{
    id: 1,
    name: 'SpiderDude',
    strength: 8
  },
  {
    id: 2,
    name: 'Wonderful Woman',
    strength: 24
  },
  {
    id: 3,
    name: 'SuperDude',
    strength: 55
  }];
  let service: HeroService;
  let mockMessageService: SpyObj<MessageService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['addMessage']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    service = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getHeroes', () => {
    it('should call get with the correct URL', () => {
      service.getHero(1).subscribe();

      const request: TestRequest = httpTestingController.expectOne('api/heroes/1');

      request.flush({
        id: 1,
        name: 'SuperDude',
        strength: 100
      });
    });
  });
});
