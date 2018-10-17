import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display weak if strength is 5', () => {
    const actual: string = pipe.transform(5);

    expect(actual).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    const actual: string = pipe.transform(10);

    expect(actual).toEqual('10 (strong)');
  });
});
