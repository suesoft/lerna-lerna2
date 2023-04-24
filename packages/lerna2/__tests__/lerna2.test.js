'use strict';

const lerna2 = require('..');

describe("@lerna2/lerna2", () => {
  it("test lerna2", () => {
    expect(lerna2()).toBe("Hello from lerna2");
  });
});