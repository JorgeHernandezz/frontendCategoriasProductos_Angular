import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriassComponent } from './categoriass.component';

describe('CategoriassComponent', () => {
  let component: CategoriassComponent;
  let fixture: ComponentFixture<CategoriassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
