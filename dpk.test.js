const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same key when proper event is passed with key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "Hello"});
    expect(trivialKey).toBe("Hello");
  });

  it("Returns a new key when proper event is passed without a key", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length <= 256).toBe(true);
  });

  it("Returns a new key when proper event is passed with undefined key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: undefined});
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length <= 256).toBe(true);
  });

  it("Returns a new key when proper event is passed with partition key as object", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: {value : "Hello"}});
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length <= 256).toBe(true);
  });

});

