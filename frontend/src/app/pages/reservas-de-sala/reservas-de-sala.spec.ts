import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasDeSala } from './reservas-de-sala';

describe('ReservasDeSala', () => {
  let component: ReservasDeSala;
  let fixture: ComponentFixture<ReservasDeSala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasDeSala],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasDeSala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
