import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioActiveComponent } from './scenario-active.component';

describe('ScenarioActiveComponent', () => {
  let component: ScenarioActiveComponent;
  let fixture: ComponentFixture<ScenarioActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
