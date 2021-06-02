import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

import { CreateComponent } from './create.component';

import Dragon from 'src/app/interfaces/dragon';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  
  let dragonsApiService: DragonsApiService;
  let dragon: Dragon;

  let router: Router;
  const URL_NAV = [ '/' ];

  const mockDragonsApiService = {
    create(name: string, type: string, histories: string) {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CreateComponent 
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: DragonsApiService,
          useValue: mockDragonsApiService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    dragon = {
      id: '1', 
      name: 'Balerion', 
      type: 'Valiriano', 
      histories: 'Dragão de Aegon Targaryen.', 
      createdAt: new Date()
    };

    //mock DragonsApiService
    dragonsApiService = TestBed.inject(DragonsApiService);
    spyOn(dragonsApiService, 'create').and.returnValue(of(dragon));

    router = TestBed.inject(Router);
		spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('form should be invalid if empty', () => {
    expect(component.createForm.valid).toBeFalsy();
  });

  it('input name should be validated', () => {
    let errors = {};
    
    const name = component.createForm.controls['name'];
    errors = name.errors || {};

    expect(name.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    name.setValue('Balerion');
    errors = name.errors || {};

    expect(name.valid).toBeTruthy();
    expect(errors['required']).toBeFalsy();
  });

  it('input type should be validated', () => {
    let errors = {};
    
    const type = component.createForm.controls['type'];
    errors = type.errors || {};

    expect(type.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    type.setValue('Valiriano');
    errors = type.errors || {};

    expect(type.valid).toBeTruthy();
    expect(errors['required']).toBeFalsy();
  });

  it('input histories should be validated', () => {
    let errors = {};
    
    const histories = component.createForm.controls['histories'];
    errors = histories.errors || {};

    expect(histories.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    histories.setValue('Dragão de Aegon Targaryen');
    errors = histories.errors || {};

    expect(histories.valid).toBeTruthy();
    expect(errors['required']).toBeFalsy();
  });

  it('should be able to create a dragon', fakeAsync(() => {
    fixture.detectChanges();
		tick();

    const name = component.createForm.controls['name'];
    name.setValue(dragon.name);

    const type = component.createForm.controls['type'];
    type.setValue(dragon.type);

    const histories = component.createForm.controls['histories'];
    histories.setValue(dragon.histories);

    expect(component.createForm.valid).toBeTruthy();

    component.create();

    expect(dragonsApiService.create).toHaveBeenCalled();
    expect(dragonsApiService.create).toHaveBeenCalledTimes(1);
    expect(dragonsApiService.create)
    .toHaveBeenCalledOnceWith(dragon.name, dragon.type, dragon.histories);
     
    expect(router.navigate).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledTimes(1);
		expect(router.navigate).toHaveBeenCalledWith(URL_NAV);
  })); 
});
