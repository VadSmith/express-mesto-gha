class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 507;
  }
}

module.exports = NotFound;