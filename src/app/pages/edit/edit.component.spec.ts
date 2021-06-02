import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EditComponent } from './edit.component';

import Dragon from 'src/app/interfaces/dragon';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let dragonsApiService: DragonsApiService;
  let dragon: Dragon;
  let updateDragon: Dragon;

  let router: Router;
  const URL_NAV = [ '/' ];

  const mockDragonsApiService = {
    update(id: string, name: string, type: string, histories: string) {},
    findOneById(id: string) {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        EditComponent 
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
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    component.dragonId = '1';

    dragon = {
      id: '1', 
      name: 'Balerion', 
      type: 'Valiriano', 
      histories: 'Dragão de Aegon Targaryen.', 
      createdAt: new Date()
    };

    updateDragon = {
      ...dragon,
      name: 'Meraxes', 
      type: 'Valiriano Antigo', 
      histories: 'Dragão de Aegon Targaryen. Conhecido como terror negro.', 
    }

    //mock DragonsApiService
    dragonsApiService = TestBed.inject(DragonsApiService);
    spyOn(dragonsApiService, 'update').and.returnValue(of(updateDragon));
    spyOn(dragonsApiService, 'findOneById').and.returnValue(of(dragon));

    router = TestBed.inject(Router);
		spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should be able to fetch a dragon', fakeAsync(() => {
    expect(dragonsApiService.findOneById).toHaveBeenCalled();
    expect(dragonsApiService.findOneById).toHaveBeenCalledTimes(1);
    expect(dragonsApiService.findOneById).toHaveBeenCalledOnceWith(component.dragonId);
  }));

  it('should be able to render a dragon', () => {
    const name = component.editForm.controls['name'].value;
    const type = component.editForm.controls['type'].value;
    const histories = component.editForm.controls['histories'].value;

    expect(name).toBe(dragon.name);
    expect(type).toBe(dragon.type);
    expect(histories).toBe(dragon.histories);
  });

  it('form should be invalid if empty', () => {
    const name = component.editForm.controls['name'];
    name.setValue(null);

    const type = component.editForm.controls['type'];
    type.setValue(null);

    const histories = component.editForm.controls['histories'];
    histories.setValue(null);

    expect(component.editForm.valid).toBeFalsy();
  });

  it('input name should be validated', () => {
    let errors = {};
    
    const name = component.editForm.controls['name'];
    name.setValue(null);

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
    
    const type = component.editForm.controls['type'];
    type.setValue(null);

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
    
    const histories = component.editForm.controls['histories'];
    histories.setValue(null);
    
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

    const nameInput = component.editForm.controls['name'];
    nameInput.setValue(updateDragon.name);

    const typeInput = component.editForm.controls['type'];
    typeInput.setValue(updateDragon.type);

    const historiesInput = component.editForm.controls['histories'];
    historiesInput.setValue(updateDragon.histories);

    expect(component.editForm.valid).toBeTruthy();

    component.edit();

    expect(dragonsApiService.update).toHaveBeenCalled();
    expect(dragonsApiService.update).toHaveBeenCalledTimes(1);

    const { id, name, type, histories } = updateDragon;
    expect(dragonsApiService.update).toHaveBeenCalledOnceWith(id, name, type, histories);

    expect(router.navigate).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledTimes(1);
		expect(router.navigate).toHaveBeenCalledWith(URL_NAV);
  }));
});
