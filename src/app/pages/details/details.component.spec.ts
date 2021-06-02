import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import Dragon from 'src/app/interfaces/dragon';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let dragonsApiService: DragonsApiService;
  let dragon: Dragon;

  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let des: DebugElement[];
	let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsComponent 
      ],
      imports: [
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
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    dragon = {
      id: '1', 
      name: 'Balerion', 
      type: 'Valeriano', 
      histories: 'Também conhecido como terror negro.', 
      createdAt: new Date()
    };

    //mock DragonsApiService
    dragonsApiService = TestBed.inject(DragonsApiService);
    spyOn(dragonsApiService, 'findOneById').and.returnValue(of(dragon));

    fixture.detectChanges();
  });

  it('should be able to render the dragon', () => {
    des = fixture.debugElement
    .queryAll(By.css('#details > .card'));

    const name = des[0].children[1].nativeElement.textContent;
    const type = des[1].children[1].nativeElement.textContent;
    const histories = des[2].children[1].nativeElement.textContent;

    expect(dragonsApiService.findOneById).toHaveBeenCalled();
    expect(dragonsApiService.findOneById).toHaveBeenCalledTimes(1);
    expect(name).toBe(dragon.name);
    expect(type).toBe(dragon.type);
    expect(histories).toBe(dragon.histories);
  });
});
