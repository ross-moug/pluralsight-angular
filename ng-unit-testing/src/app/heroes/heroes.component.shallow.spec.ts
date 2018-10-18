import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { EventEmitter, Input, Output, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `<div></div>`,
})
class FakeHeroComponent {
  @Input() hero: Hero;
  @Output() delete = new EventEmitter();
}

describe('HeroesComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroService: SpyObj<HeroService>;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
      ],
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
