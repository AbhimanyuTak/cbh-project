const crypto = require("crypto");

function generateHash(data) {
  if (typeof candidate !== "string") {
    data = JSON.stringify(data);
  }

  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;
  
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      candidate = generateHash(event)
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHash(candidate)
  }

  return candidate;
};