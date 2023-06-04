import React, { useEffect, useState } from "react";

function LocationForm(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.room_count = formData.count;
    data.name = formData.name;
    data.city = formData.city;
    data.state = formData.state;

    const locationUrl = "http://localhost:8000/api/locations/";
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
        count: "",
        city: "",
        state: "",
      });
      //   setName("");
      //   setRoom("");
      //   setCity("");
      //   setState("");
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    count: "",
    city: "",
    state: "",
  });
  const handleFormStateChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  //   const [name, setName] = useState("");
  //   const handleNameChange = (event) => {
  //     const value = event.target.value;
  //     setName(value);
  //   };

  //   const [count, setRoom] = useState(0);
  //   const handleRoomCount = (event) => {
  //     const value = event.target.value;
  //     setRoom(value);
  //   };

  //   const [city, setCity] = useState("");
  //   const handleCity = (event) => {
  //     const value = event.target.value;
  //     setCity(value);
  //   };

  //   const [state, setState] = useState("");
  //   const handleState = (event) => {
  //     const value = event.target.value;
  //     setState(value);
  //   };

  const [states, setStates] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setStates(data.states);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new location</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                placeholder="Name"
                value={formData.name}
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
                value={formData.count}
                placeholder="Room count"
                required
                type="number"
                name="count"
                id="room_count"
                className="form-control"
              />
              <label htmlFor="room_count">Room count</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormStateChange}
                value={formData.city}
                placeholder="City"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="state"
                onChange={handleFormStateChange}
                value={formData.state}
                id="state"
                className="form-select"
              >
                <option value="">Choose a state</option>
                {states.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
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

export default LocationForm;
