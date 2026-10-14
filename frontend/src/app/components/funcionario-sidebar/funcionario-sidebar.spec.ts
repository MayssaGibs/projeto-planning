import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuncionarioSidebar } from './funcionario-sidebar';

describe('FuncionarioSidebar', () => {
  let component: FuncionarioSidebar;
  let fixture: ComponentFixture<FuncionarioSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
