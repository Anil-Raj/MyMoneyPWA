import { DayPipe } from './day.pipe';

describe('DayPipe', () => {
  it('create an instance', () => {
    const pipe = new DayPipe();
    expect(pipe).toBeTruthy();
  });
  it('returns day of a date', () => {

    const pipe = new DayPipe();
    const date = new Date('06/29/2018');
    expect(pipe.transform( date, '')).toBe('Friday');
  });
});
