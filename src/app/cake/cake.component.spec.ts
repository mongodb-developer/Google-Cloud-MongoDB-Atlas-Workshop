import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeComponent } from './cake.component';

describe('CakeComponent', () => {
  let component: CakeComponent;
  let fixture: ComponentFixture<CakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
