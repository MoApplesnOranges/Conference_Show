import React, { useEffect, useState } from "react";

function ConferenceForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = formData.name;
    data.starts = formData.starts;
    data.ends = formData.ends;
    data.description = formData.description;
    data.max_presentations = formData.max_p;
    data.max_attendees = formData.max_a;
    data.location = formData.location;

    const locationUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newLocation = await response.json();
      console.log(newLocation);
      setFormData({
        name: "",
        starts: "",
        ends: "",
        description: "",
        max_p: "",
        max_a: "",
        location: "",
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    starts: "",
    ends: "",
    description: "",
    max_p: "",
    max_a: "",
    location: "",
  });

  const handleFormStateChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const [locations, setLocations] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data.locations);
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
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
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.starts}
                placeholder="Starts"
                required
                type="date"
                name="starts"
                id="Starts"
                className="form-control"
              />
              <label htmlFor="Starts">Starts</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.ends}
                placeholder="Ends"
                required
                type="date"
                name="ends"
                id="Ends"
                className="form-control"
              />
              <label htmlFor="Ends">Ends</label>
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                onChange={handleFormStateChange}
                value={formData.description}
                className="form-control"
                id="Description"
                name="description"
                rows="3"
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.max_p}
                placeholder="max_Presentations"
                required
                type="number"
                name="max_p"
                id="max_Presentations"
                className="form-control"
              />
              <label
                htmlFor="max_Presentations"
                style={{ textalign: "center" }}
              >
                Maximum Presentations
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.max_a}
                placeholder="max_attendees"
                required
                type="number"
                name="max_a"
                id="Max_attendees"
                className="form-control"
              />
              <label htmlFor="max_attendees">Maximum Attendees</label>
            </div>
            <div className="mb-3">
              <select
                required
                id="location"
                className="form-select"
                name="location"
                value={formData.location}
                onChange={handleFormStateChange}
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.name}
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

export default ConferenceForm;
