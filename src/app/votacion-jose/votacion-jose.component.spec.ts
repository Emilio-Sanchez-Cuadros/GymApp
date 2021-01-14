import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionJoseComponent } from './votacion-jose.component';

describe('VotacionJoseComponent', () => {
  let component: VotacionJoseComponent;
  let fixture: ComponentFixture<VotacionJoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotacionJoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotacionJoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
