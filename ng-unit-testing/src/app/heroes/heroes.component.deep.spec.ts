import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import {
  NO_ERRORS_SCHEMA,
  DebugElement
} from '@angular/core';
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
  });

  describe('deleteHero', () => {
    it(`should call heroService.deleteHero when the HeroComponent delete button is clicked`, () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
      debugElements[0].query(By.css('button')).triggerEventHandler('click', {
        stopPropagation: () => {},
      });

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
    });

    it('should call heroService.deleteHero when the HeroComponent emits a delete event', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      const heroComponent: HeroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent))[0].componentInstance;
      heroComponent.delete.emit();

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
    });

    it('should call heroService.deleteHero when the HeroComponent emits a delete event using DebugElement', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      fixture.detectChanges();

      const heroComponentDebugElement: DebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent))[0];
      heroComponentDebugElement.triggerEventHandler('delete', undefined);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
    });
  });
});
