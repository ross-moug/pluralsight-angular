import { VoterService } from './voter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from '../models';
import { of } from 'rxjs';

describe('VoterService', () => {
  let service: VoterService;
  let mockHttp: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['post', 'delete']);
    service = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      mockHttp.delete.and.returnValue(of());
      const session: Session = <Session>{
        id: 6,
        voters: ['Alice', 'Bob', 'Claire']
      };

      service.deleteVoter(3, session, 'Bob');

      expect(session.voters.length).toBe(2);
      expect(session.voters[1]).toBe('Claire');
    });

    it('should call http.delete with the right URL', () => {
      mockHttp.delete.and.returnValue(of());
      const session: Session = <Session>{
        id: 6,
        voters: ['Alice', 'Bob', 'Claire']
      };

      service.deleteVoter(3, session, 'Bob');

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Bob', jasmine.any(Object));
    });
  });

  describe('addVoter', () => {
    it('should add the voter to the list of voters', () => {
      mockHttp.post.and.returnValue(of());
      const session: Session = <Session>{
        id: 6,
        voters: ['Alice', 'Bob', 'Claire']
      };

      service.addVoter(3, session, 'Dave');

      expect(session.voters.length).toBe(4);
      expect(session.voters[3]).toBe('Dave');
    });

    it('should call http.post with the right URL', () => {
      mockHttp.post.and.returnValue(of());
      const session: Session = <Session>{
        id: 6,
        voters: ['Alice', 'Bob', 'Claire']
      };

      service.addVoter(3, session, 'Dave');

      expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Dave', {}, jasmine.any(Object));
    });
  });
});
