import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpaceXProgramsComponent } from './space-x-programs.component';

describe('SpaceXProgramsComponent', () => {
  let component: SpaceXProgramsComponent;
  let fixture: ComponentFixture<SpaceXProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceXProgramsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceXProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call applyFilter function on button click', () => {
    spyOn(component, 'applyFilter');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.applyFilter).toHaveBeenCalled();
  });

});
