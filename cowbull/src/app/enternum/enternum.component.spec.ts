import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnternumComponent } from './enternum.component';

describe('EnternumComponent', () => {
  let component: EnternumComponent;
  let fixture: ComponentFixture<EnternumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnternumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnternumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
