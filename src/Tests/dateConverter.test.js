import dateBrModel from '../helper/dateConverter';

describe('Test date converter', () => {
  it('should now date', () => {
    const dateAct = dateBrModel();

    expect(dateAct).toBe('08/02/2021');
  });
});
