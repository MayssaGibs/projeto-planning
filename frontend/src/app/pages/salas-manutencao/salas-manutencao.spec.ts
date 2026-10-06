import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalasManutencao } from './salas-manutencao';

describe('SalasManutencao', () => {
  let component: SalasManutencao;
  let fixture: ComponentFixture<SalasManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasManutencao],
    }).compileComponents();

    fixture = TestBed.createComponent(SalasManutencao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
