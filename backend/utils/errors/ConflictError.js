class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    // this.ok = false;
  }
}

module.exports = ConflictError;
