import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSecComponent } from './chat-sec.component';

describe('ChatSecComponent', () => {
  let component: ChatSecComponent;
  let fixture: ComponentFixture<ChatSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
