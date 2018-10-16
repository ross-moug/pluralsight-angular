import { SessionListComponent } from "./session-list.component";
import { AuthService } from "../../user/services/auth.service";
import { VoterService } from "../../services";
import { Session } from "../../models";

describe('SessionList', () => {
  let component: SessionListComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let voterService: jasmine.SpyObj<VoterService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['']);
    voterService = jasmine.createSpyObj('VoterService', ['']);
    component = new SessionListComponent(authService, voterService);
  });

  describe('ngOnChanges', () => {
    it('should filter sessions correctly', () => {
      component.sessions = <Session[]>[{
        name: 'session 1',
        level: 'intermediate'
      },
      {
        name: 'session 2',
        level: 'intermediate'
      },
      {
        name: 'session 3',
        level: 'beginner'
      }];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
      expect(component.visibleSessions).toEqual(<Session[]>[{
        name: 'session 1',
        level: 'intermediate'
      },
      {
        name: 'session 2',
        level: 'intermediate'
      }]);
    });

    it('should sort sessions correctly', () => {
      component.sessions = <Session[]>[{
        name: 'session 1',
        level: 'intermediate'
      },
      {
        name: 'session 3',
        level: 'beginner'
      },
      {
        name: 'session 2',
        level: 'intermediate'
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(3);
      expect(component.visibleSessions).toEqual(<Session[]>[{
        name: 'session 1',
        level: 'intermediate'
      },
      {
        name: 'session 2',
        level: 'intermediate'
      },
      {
        name: 'session 3',
        level: 'beginner'
      }]);
    });
  });
});