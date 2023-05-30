// Get the cookie out of the cookie store
const payloadCookie = document.cookie;
const parts = payloadCookie.split("jwt_access_payload=");
const cookieValue = parts.pop().split(";").shift();
if (payloadCookie) {
  //   The cookie value is a JSON-formatted string, so parse it
  //   const encodedPayload = JSON.parse(cookieValue);
  // //   Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(cookieValue);
  //     // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);
  //     // Print the payload
  console.log(payload);
  // Check if "events.add_conference" is in the permissions.
  // Check if "events.add_location" is in the permissions.
  if (
    payload.user.perms.includes("events.add_conference") &&
    payload.user.perms.includes("events.add_location") &&
    payload.user.perms.includes("presentations.add_presentation")
  ) {
    const dNone = document.querySelectorAll(".nav-link");
    dNone.forEach((tag) => {
      tag.classList.remove("d-none");
    });
  }
}
