import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgInputComponent } from './msg-input.component';

describe('MsgInputComponent', () => {
  let component: MsgInputComponent;
  let fixture: ComponentFixture<MsgInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
