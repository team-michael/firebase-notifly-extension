/* const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
}); */

describe('Utils', () => {
  describe('addOne', () => {
    const addOne =
      require('../functions/src/utils').addOne;
    describe('add one', () => {
      it('add one', () => {
        const result = addOne(1);
        expect(result).toEqual(2);
      });
    });
  });
});
