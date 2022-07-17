import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakesListComponent } from './cakes-list.component';

describe('CakesListComponent', () => {
  let component: CakesListComponent;
  let fixture: ComponentFixture<CakesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CakesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
