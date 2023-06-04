import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import React from "react";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendeeSignUp from "./AttendeeSignUp";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      {/* <div className="container"> */}
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="presentations/new" element={<PresentationForm />} />
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="attendees">
          <Route path="new" element={<AttendeeSignUp />} />
        </Route>
        {/* <Route
            path="attendees"
            element={<AttendeesList attendees={props.attendees} />}
          /> */}
        {/* <Route path="attendees">
            <Route element={<AttendeesList attendees={props.attendees} />} />
          </Route> */}
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
