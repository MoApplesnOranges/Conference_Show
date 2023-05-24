function createCard(name, description, pictureUrl, start, end, location) {
  return `<div class="card">
    <img src="${pictureUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
      <p class="card-text">${description}</p>
    </div>
    <div class="card-footer">
    ${start} - ${end}
    </div>
    </div>
    `;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // when response is bad?
      throw new Error("Response is not ok.");
    } else {
      const data = await response.json();
      const array = [];
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const location = details.conference.location.name;
          const sDate = new Date(details.conference.starts);
          const start = sDate.toLocaleDateString();
          const eDate = new Date(details.conference.ends);
          const end = eDate.toLocaleDateString();
          const html = createCard(
            name,
            description,
            pictureUrl,
            start,
            end,
            location
          );
          array.push(html);
          //   const column = document.querySelectorAll(".col");
          //   column.innerHTML += html;
        }
        // const conference = data.conferences[0];
        // const nameTag = document.querySelector(".card-title");
        // nameTag.innerHTML = conference.name;

        // console.log(details);
        // const conferenceDetail = details.conference.description;
        // const detailTag = document.querySelector(".card-text");
        // detailTag.innerHTML = conferenceDetail;
        // const pictureDetail = details.conference.location.picture_url;
        // const pictureTag = document.querySelector(".card-img-top");
        // pictureTag.src = pictureDetail;
      }
      //   const column = document.querySelectorAll(".col");
      //   for (let i = 0; i < column.length; i++) {
      //     column[i].innerHTML = array[i];
      //   }
      const gridContainer = document.getElementById("grid-container");
      array.forEach((el) => {
        const conf = document.createElement("div");
        conf.innerHTML = el;
        gridContainer.appendChild(conf);
      });
    }
  } catch (e) {
    // when error is raised
    console.log("An error has occured:", e.message);
    const alert = document.getElementById("Alert");
    alert.innerHTML = `<div class="alert alert-danger" role="alert">
    Error: ${e.message}
  </div>`;
  }
});
