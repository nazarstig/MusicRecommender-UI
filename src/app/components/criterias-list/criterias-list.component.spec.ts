import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriasListComponent } from './criterias-list.component';

describe('CriteriasListComponent', () => {
  let component: CriteriasListComponent;
  let fixture: ComponentFixture<CriteriasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
