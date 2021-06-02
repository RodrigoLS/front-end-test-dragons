import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import Dragon from 'src/app/interfaces/dragon';
import { SortPipe } from 'src/app/pipes/sort.pipe';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;
	let el: HTMLElement;

  let dragonsService: DragonsApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListComponent,
        SortPipe
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AppRoutingModule
      ],
      providers: [
        DragonsApiService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    const listDragons: Dragon[] = [
      { 
        id: '1',
        name: 'Balerion', 
        type: 'Valiriano', 
        histories: 'Dragão de Aegon', 
        createdAt: new Date() 
      },
      { 
        id: '2', 
        name: 'Meraxes', 
        type: 'Puro', 
        histories: 'Dragão de Rhaenys Targaryen', 
        createdAt: new Date() 
      }
    ]

    //mock DragonsApiService
    dragonsService = TestBed.inject(DragonsApiService);
    spyOn(dragonsService, 'getAll').and.returnValue(of(listDragons));
    spyOn(dragonsService, 'delete').and.returnValue(of(listDragons[0]));

    fixture.detectChanges();
  });

  it('should be able to display the title', () => {
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    
    expect(el.textContent).toContain('Dragões');
  });

  it('should be able to list the dragons', () => {
    let des: DebugElement[] = fixture.debugElement
    .queryAll(By.css('table > tbody > tr'));

    expect(des.length).toBe(2);
    expect(dragonsService.getAll).toHaveBeenCalled();
    expect(dragonsService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should be able to render the dragon', () => {
    let des: DebugElement[] = fixture.debugElement
    .queryAll(By.css('table > tbody > tr'));

    const dragonName01 = des[0].children[0].nativeElement;
    const dragonType01 = des[0].children[1].nativeElement;
    
    const dragonName02 = des[1].children[0].nativeElement;
    const dragonType02 = des[1].children[1].nativeElement;
    
    expect(dragonName01.textContent).toContain('Balerion');
    expect(dragonType01.textContent).toContain('Valiriano');

    expect(dragonName02.textContent).toContain('Meraxes');
    expect(dragonType02.textContent).toContain('Puro');
  });
});
