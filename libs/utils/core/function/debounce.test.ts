import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => jest.useFakeTimers('modern'));
  afterEach(() => jest.useRealTimers());

  test('Should fires once', () => {
    const debounced = debounce(jest.fn());

    debounced(1);
    debounced(1);
    debounced(2);
    debounced(3);
    jest.runAllTimers();
    expect(debounced.fn).toHaveBeenCalledTimes(1);
    expect(debounced.fn).toHaveBeenCalledWith(3);
  });
  test('Should be cleared', () => {
    const debounced = debounce(jest.fn());

    debounced(1);
    debounced.clear();
    jest.runAllTimers();
    expect(debounced.fn).not.toHaveBeenCalled();
  });
});
