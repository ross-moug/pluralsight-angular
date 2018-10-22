import {
  TestBed,
  ComponentFixture
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs/internal/observable/of";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import SpyObj = jasmine.SpyObj;

describe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;
  let mockHeroService: SpyObj<HeroService>;
  let mockLocation: SpyObj<Location>;
  let mockActivatedRoute: Object;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj("HeroService", ["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj("Location", ["back"]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => "3"
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        HeroDetailComponent,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  describe("init", () => {
    it("should render hero name in h2 tag", () => {
      mockHeroService.getHero.and.returnValue(of({
        id: 3,
        name: "SuperDude",
        strength: 100,
      }));

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector("h2").textContent).toContain("SUPERDUDE");
    });
  });
});
