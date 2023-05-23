window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // when response is bad?
      throw new Error("Response is not ok.");
    } else {
      const data = await response.json();
      const conference = data.conferences[0];
      const nameTag = document.querySelector(".card-title");
      nameTag.innerHTML = conference.name;

      const detailUrl = `http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      if (detailResponse.ok) {
        const details = await detailResponse.json();
        console.log(details);
        const conferenceDetail = details.conference.description;
        const detailTag = document.querySelector(".card-text");
        detailTag.innerHTML = conferenceDetail;
        const pictureDetail = details.conference.location.picture_url;
        const pictureTag = document.querySelector(".card-img-top");
        pictureTag.src = pictureDetail;
      }
    }
  } catch (e) {
    // when error is raised
    console.log("An error has occured:", e.message);
  }
});
