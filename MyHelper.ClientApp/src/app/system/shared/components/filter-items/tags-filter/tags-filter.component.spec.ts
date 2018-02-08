import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFilterComponent } from './autocomplete-filter.component';

describe('AutocompleteFilterComponent', () => {
  let component: AutocompleteFilterComponent;
  let fixture: ComponentFixture<AutocompleteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
