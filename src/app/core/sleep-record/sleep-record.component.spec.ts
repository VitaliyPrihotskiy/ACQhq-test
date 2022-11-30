import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepRecordComponent } from './sleep-record.component';

describe('SleepRecordComponent', () => {
  let component: SleepRecordComponent;
  let fixture: ComponentFixture<SleepRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
