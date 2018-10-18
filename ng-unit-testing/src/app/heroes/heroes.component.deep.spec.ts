import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep)', () => {
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
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroService: SpyObj<HeroService>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
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
    it('should render each hero as a HeroComponent', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));

      expect(debugElements.length).toBe(3);
      for (let i = 0; i < heroes.length; i++) {
        expect(debugElements[i].componentInstance.hero.name).toEqual(heroes[i].name);
      }
    });

    // it('should create one li for each hero', () => {
    //   mockHeroService.getHeroes.and.returnValue(of(heroes));

    //   fixture.detectChanges();

    //   expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    // });
  });
});
