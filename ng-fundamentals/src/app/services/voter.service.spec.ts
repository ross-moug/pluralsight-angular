import { VoterService } from "./voter.service";
import { HttpClient } from "@angular/common/http";
import { Session } from "../models";
import { of } from "rxjs";;

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
  });
});