window.addEventListener("DOMContentLoaded", async () => {
  const selectTag = document.getElementById("conference");

  const url = "http://localhost:8000/api/conferences/";
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement("option");
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }
    // Here, add the 'd-none' class to the loading icon
    const load = document.getElementById("loading-conference-spinner");
    load.classList.replace("xavier", "d-none");
    selectTag.classList.replace("d-none", "alfredo");
    // Here, remove the 'd-none' class from the select tag
  }
  const form = document.getElementById("create-attendee-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));
    const fetchConfig = {
      method: "Post",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const locationUrl = "http://localhost:8001/api/attendees/";
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      form.reset();
      const newAttendee = await response.json();
      console.log(newAttendee);
      const success = document.getElementById("success-message");
      success.classList.remove("d-none");
      form.classList.add("d-none");
    }
  });
});
