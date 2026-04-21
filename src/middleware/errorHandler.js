export function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ message });
}
