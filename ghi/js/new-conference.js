window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/location_id/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response is not ok.");
    } else {
      const data = await response.json();
      const selectTag = document.getElementById("location");
      for (const locat of data.Location) {
        const option = document.createElement("option");
        option.value = locat.location;
        option.innerHTML = locat.location;
        selectTag.appendChild(option);
      }
    }
  } catch (e) {
    console.log("An error has occured:", e.message);
  }
  const form = document.getElementById("create-conference-form");
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
    const locationUrl = "http://localhost:8000/api/conferences/";
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      form.reset();
      const newConference = await response.json();
      console.log(newConference);
    }
  });
});
