import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLayoutWrapperComponent } from './body-layout-wrapper.component';

describe('BodyLayoutWrapperComponent', () => {
  let component: BodyLayoutWrapperComponent;
  let fixture: ComponentFixture<BodyLayoutWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyLayoutWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyLayoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
