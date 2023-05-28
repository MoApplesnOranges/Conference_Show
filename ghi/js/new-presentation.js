window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/choose_conference/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response is not ok.");
    } else {
      const data = await response.json();
      const selectTag = document.getElementById("conference");
      for (const conf of data.Conferences) {
        const option = document.createElement("option");
        option.innerHTML = conf.conference;
        option.value = conf.conference_id;
        selectTag.appendChild(option);
      }
    }
  } catch (e) {
    console.log("An error has occured:", e.message);
  }
  const form = document.getElementById("create-presentation-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const selectTag = document.getElementById("conference");
    const conf_id_url = selectTag.value;
    const locationUrl = `http://localhost:8000/api/conferences/${conf_id_url}/presentations/`;
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      form.reset();
      const newPresentation = await response.json();
      console.log(newPresentation);
    }
  });
});
