//Extracts and returns a user-friendly error message from an error object.
export function getErrorMessage(error) {
  // Extract the error message from the response data if available,
  // otherwise fallback to the error message or the error object converted to a string.
  const msg =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return msg;
}
