'use strict';

const create = require('..');

describe("@lerna2/create", () => {
  it("test create", () => {
    expect(create()).toBe("Hello from create");
  });
});
