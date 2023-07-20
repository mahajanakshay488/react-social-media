import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogersComponent } from './blogers.component';

describe('BlogersComponent', () => {
  let component: BlogersComponent;
  let fixture: ComponentFixture<BlogersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
