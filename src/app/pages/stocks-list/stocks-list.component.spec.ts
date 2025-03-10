import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksListComponent } from './stocks-list.component';

describe('StocksListComponent', () => {
  let component: StocksListComponent;
  let fixture: ComponentFixture<StocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
