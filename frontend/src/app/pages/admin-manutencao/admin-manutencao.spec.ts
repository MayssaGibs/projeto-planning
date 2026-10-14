import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminManutencao } from './admin-manutencao';

describe('AdminManutencao', () => {
  let component: AdminManutencao;
  let fixture: ComponentFixture<AdminManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManutencao],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManutencao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
