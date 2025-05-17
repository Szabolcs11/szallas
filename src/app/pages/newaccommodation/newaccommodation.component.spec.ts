import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAccommodationComponent } from './newaccommodation.component';

describe('NewaccommodationComponent', () => {
  let component: NewAccommodationComponent;
  let fixture: ComponentFixture<NewAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAccommodationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
