import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow)', () => {
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

    it('should render the hero name in an anchor tag using nativeElement', () => {
      component.hero = {
        id: 1,
        name: 'SuperDude',
        strength: 3
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

    it('should render the hero name in an anchor tag using debugElement', () => {
      component.hero = {
        id: 1,
        name: 'SuperDude',
        strength: 3
      };
      fixture.detectChanges();

      const anchorDebugElement: DebugElement = fixture.debugElement.query(By.css('a'));

      expect(anchorDebugElement.nativeElement.textContent).toContain('SuperDude');
    });
  });
});
