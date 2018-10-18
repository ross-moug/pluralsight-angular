import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroesComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroService: SpyObj<HeroService>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  describe('init', () => {
    it('should set heroes correctly from the service', () => {
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
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      expect(component.heroes.length).toEqual(3);
    });
  });
});
