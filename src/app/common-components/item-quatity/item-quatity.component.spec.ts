import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuatityComponent } from './item-quatity.component';

describe('ItemQuatityComponent', () => {
  let component: ItemQuatityComponent;
  let fixture: ComponentFixture<ItemQuatityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemQuatityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemQuatityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
