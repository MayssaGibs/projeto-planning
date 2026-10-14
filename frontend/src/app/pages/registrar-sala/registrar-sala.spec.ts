import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarSala } from './registrar-sala';

describe('RegistrarSala', () => {
  let component: RegistrarSala;
  let fixture: ComponentFixture<RegistrarSala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSala],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarSala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
