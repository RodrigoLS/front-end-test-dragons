import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DragonsApiService } from './dragons-api.service';
import Dragon from 'src/app/interfaces/dragon';

describe('DragonsApiService', () => {
  let service: DragonsApiService;
  let httpMock: HttpTestingController;

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
      type: 'Valiriano', 
      histories: 'Dragão de Rhaenys Targaryen', 
      createdAt: new Date() 
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DragonsApiService
      ]
    });

    service = TestBed.inject(DragonsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to fetch a list of dragons', () => {
    const mockResponse = listDragons;

    service.getAll().subscribe(dragons => {
      expect(dragons.length).toBe(2);
      expect(dragons).toEqual(mockResponse);
    })

    const request = httpMock.expectOne(`${service.BASE_URL}`);

    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should be able to search for a dragon by id', () => {
    const mockResponse = listDragons[0];

    service.findOneById('1').subscribe(dragon => {
      expect(dragon).toBeDefined();
      expect(dragon).toEqual(mockResponse);
    })

    const id = mockResponse.id;
    const request = httpMock.expectOne(`${service.BASE_URL}/${id}`);

    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should be able to create a dragon', () => {
    const mockResponse = listDragons[0];
    const name = mockResponse.name;
    const type = mockResponse.type;
    const histories = mockResponse.histories;

    service.create(name, type, histories)
    .subscribe(dragon => {
      expect(dragon).toBeDefined();
      expect(dragon).toEqual(mockResponse);
    })

    const request = httpMock.expectOne(`${service.BASE_URL}`);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ 
      name: mockResponse.name, 
      type: mockResponse.type, 
      histories: mockResponse.histories 
    })

    request.flush(mockResponse);
  });

  it('should be able to edit a dragon', () => {
    const mockResponse = listDragons[0];
    const id = mockResponse.id;
    const name = mockResponse.name;
    const type = mockResponse.type;
    const histories = mockResponse.histories;

    service.update(id, name, type, histories).subscribe(dragon => {
      expect(dragon).toBeDefined();
      expect(dragon).toEqual(listDragons[0]);
    })

    const request = httpMock.expectOne(`${service.BASE_URL}/${id}`);
    
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({name, type, histories});

    request.flush(mockResponse);
  });

  it('should be able to delete a dragon', () => {
    const mockResponse = listDragons[0];
    const id = mockResponse.id;

    service.delete(id).subscribe(dragon => {
      expect(dragon).toBeDefined();
      expect(dragon).toEqual(listDragons[0]);
    })

    const request = httpMock.expectOne(`${service.BASE_URL}/${id}`);

    expect(request.request.method).toBe('DELETE');

    request.flush(mockResponse);
  });
});
