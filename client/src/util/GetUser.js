//Retrieves and parses user details from local storage.
export function getUserDetails() {
  // Retrieve the user details JSON string from local storage
  let user = JSON.parse(localStorage.getItem("toDoAppUser"));
  return user;
}
