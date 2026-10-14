import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarFuncionario } from './adicionar-funcionario';

describe('AdicionarFuncionario', () => {
  let component: AdicionarFuncionario;
  let fixture: ComponentFixture<AdicionarFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarFuncionario],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarFuncionario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
