import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import SpyObj = jasmine.SpyObj;

describe('HeroesComponent', () => {
  let heroes: Hero[];
  let component: HeroesComponent;
  let mockHeroService: SpyObj<HeroService>;

  beforeEach(() => {
    heroes = [
      {
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
      },
    ];

    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of());
      component.heroes = heroes;

      component.delete(heroes[2]);

      expect(component.heroes.length).toBe(2);
    });
  });
});
