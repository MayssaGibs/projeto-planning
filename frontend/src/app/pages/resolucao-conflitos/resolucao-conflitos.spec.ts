import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolucaoConflitos } from './resolucao-conflitos';

describe('ResolucaoConflitos', () => {
  let component: ResolucaoConflitos;
  let fixture: ComponentFixture<ResolucaoConflitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucaoConflitos],
    }).compileComponents();

    fixture = TestBed.createComponent(ResolucaoConflitos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
