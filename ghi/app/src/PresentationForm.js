import React, { useEffect, useState } from "react";

function PresentationForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.presenter_name = formData.name;
    data.presenter_email = formData.email;
    data.company_name = formData.companyName;
    data.title = formData.title;
    data.synopsis = formData.synopsis;
    data.conference = formData.conference;

    const confID = formData.conference;
    console.log(confID);

    const locationUrl = `http://localhost:8000/api/conferences/${confID}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newPresentation = await response.json();
      console.log(newPresentation);
      setFormData({
        name: "",
        email: "",
        companyName: "",
        title: "",
        synopsis: "",
        conference: "",
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    title: "",
    synopsis: "",
    conference: "",
  });

  const handleFormStateChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const [conferences, setConferences] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8000/api/choose_conference/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data.Conferences);
      setConferences(data.Conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <p>Presentation Form</p>
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Presenter Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.email}
                placeholder="Email"
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Presenter Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.companyName}
                placeholder="Company Name"
                required
                type="text"
                name="companyName"
                id="companyName"
                className="form-control"
              />
              <label htmlFor="companyName">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.title}
                placeholder="title"
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="Synopsis" className="form-label">
                Synopsis
              </label>
              <textarea
                onChange={handleFormStateChange}
                value={formData.synopsis}
                className="form-control"
                id="synopsis"
                name="synopsis"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <select
                required
                id="conference"
                className="form-select"
                name="conference"
                value={formData.conference}
                onChange={handleFormStateChange}
              >
                <option value="">Choose a conference</option>
                {conferences.map((conference) => {
                  return (
                    <option
                      key={conference.conference_id}
                      value={conference.conference_id}
                    >
                      {conference.conference}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PresentationForm;
