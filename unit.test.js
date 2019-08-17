const add = () => {
  return abc;
};

describe("unit.test", () => {
  describe("add", () => {
    test("add", () => {
      const x = add(1, 2);
      expect(x).toBe(3);
    });
  });
});
