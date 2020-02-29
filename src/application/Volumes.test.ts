import {singleOrPlural, Volumes} from "./Volumes";

describe("Volumes", () => {
  describe("singleOrPlural", () => {
    describe("Tablespoons", () => {
      describe("when there is a single tablespoon", () => {
        it("returns 'tablespoon'", () => {
          expect(singleOrPlural({value: 1, volumeType: Volumes.tablespoon})).toEqual("tablespoon");
        });
      });

      describe("when there is more than a single tablespoon", () => {
        it("returns 'tablespoons'", () => {
          expect(singleOrPlural({value: 2, volumeType: Volumes.tablespoon})).toEqual("tablespoons");
        });
      });
    });
  });
});
