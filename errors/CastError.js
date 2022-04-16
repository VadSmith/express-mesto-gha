class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 407;
  }
}

module.exports = CastError;