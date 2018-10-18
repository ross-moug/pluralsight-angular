import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  describe('events', () => {
    it('should have the correct hero', () => {
      component.hero = {
        id: 1,
        name: 'SuperDude',
        strength: 3
      };

      expect(component.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag', () => {
      component.hero = {
        id: 1,
        name: 'SuperDude',
        strength: 3
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
  });
});
