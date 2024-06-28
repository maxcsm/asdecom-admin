import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventplanningPage } from './edit-eventplanning.page';

describe('EditEventplanningPage', () => {
  let component: EditEventplanningPage;
  let fixture: ComponentFixture<EditEventplanningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventplanningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventplanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
