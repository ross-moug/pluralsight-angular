import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/services/auth.service';
import { VoterService } from '../../services';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../../pipes';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SessionList (shallow)', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let nativeElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent,
        DurationPipe
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            currentUser: {
              userName: 'Elise'
            }
          }
        },
        {
          provide: VoterService,
          useValue: {
            userHasVoted: () => true
          }
        },
      ],
      // It is better to use fake components rather than this schema
      // as this can mean that the test spec will ignore invaid HTML
      // in the template
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  describe('initial display', () => {
    it('should have the correct session title using nativeElement', () => {
      component.sessions = [{
        id: 3,
        name: 'Session 1',
        presenter: 'Alice',
        duration: 1,
        level: 'beginner',
        abstract: 'abstract',
        voters: ['Bob', 'Claire']
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(nativeElement.querySelector('[well-title]').textContent).toContain('Session 1');
    });

    it('should have the correct session title using debugElement', () => {
      component.sessions = [{
        id: 3,
        name: 'Session 1',
        presenter: 'Alice',
        duration: 1,
        level: 'beginner',
        abstract: 'abstract',
        voters: ['Bob', 'Claire']
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

     expect(debugElement.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });
  });
});
