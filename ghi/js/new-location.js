console.log("Hello");

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/states/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response is not ok.");
    } else {
      const data = await response.json();
      const selectTag = document.getElementById("state");
      for (const state of data.states) {
        // for (const [k, v] of Object.entries(state)) {
        const option = document.createElement("option");
        option.value = state.abbreviation;
        option.innerHTML = state.name;
        selectTag.appendChild(option);
        // }
      }
    }
  } catch (e) {
    console.log("An error has occured:", e.message);
  }
  const form = document.getElementById("create-location-form");
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
    const locationUrl = "http://localhost:8000/api/locations/";
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      form.reset();
      const newLocation = await response.json();
      console.log(newLocation);
    }
  });
});
