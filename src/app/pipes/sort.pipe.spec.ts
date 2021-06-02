import { pipe } from 'rxjs';
import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {

  let pipe: SortPipe = new SortPipe();

  const list = [
    { firstName: 'Beatriz', lastName: 'Eldorado' },
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Daniela', lastName: 'Garcia' },
    { firstName: 'Carla', lastName: 'Dias' },
  ]

  const mockListOrderedByFirstName = [
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Beatriz', lastName: 'Eldorado' },
    { firstName: 'Carla', lastName: 'Dias' },
    { firstName: 'Daniela', lastName: 'Garcia' },
  ]

  const mockListOrderedByLastName = [
    { firstName: 'Carla', lastName: 'Dias' },
    { firstName: 'Beatriz', lastName: 'Eldorado' },
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Angela', lastName: 'Fernandez' },
    { firstName: 'Daniela', lastName: 'Garcia' },
  ]

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be able to sort an array in alphabetical order, based on the key sent as a parameter', () => {
    const listOrderedByFirstName = pipe.transform(list, 'firstName');
    expect(listOrderedByFirstName).toEqual(mockListOrderedByFirstName);
    
    const listOrderedByLastName = pipe.transform(list, 'lastName');
    expect(listOrderedByLastName).toEqual(mockListOrderedByLastName);
  });

  it('should be able to return an empty array if the array passed as a parameter is invalid', () => {
    expect(pipe.transform(null, 'key')).toEqual([]);
    expect(pipe.transform(undefined, 'key')).toEqual([]);
  });

  it('should be able to return the same array sent as a parameter if the key is invalid', () => {
    const orderedList = pipe.transform(list, 'invalidKey');
    expect(orderedList).toEqual(list);
  });
});
