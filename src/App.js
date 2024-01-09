import { useState, useReducer, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "pages/Login/Login";
import CreateProfile from "pages/CreateProfile/CreateProfile";
import ViewProfile from "pages/ViewPage/ViewProfile";
import EditProfile from "pages/EditProfile/EditProfile";
import "./App.css";

import React from "react";

function App() {
   const [profile, setProfile] = useState();

   let localStorageProfiles = localStorage.getItem("profiles");
   localStorageProfiles = localStorageProfiles ? JSON.parse(localStorageProfiles) : [];

   const reducer = (state, action) => {
      switch (action.type) {
         case "edit":
            return state.map((p) => (p.email === action.old.email ? action.profile : p));
         case "delete":
            return state.filter((p) => p.email !== action.profile.email);
         case "add":
            return state.concat(action.profile);
         default:
            return state;
      }
   };

   const [profiles, dispatch] = useReducer(reducer, localStorageProfiles);

   const timedoutDialog = useRef();

   const TimedoutDialogHtml = () => {
      return (
         <dialog ref={timedoutDialog}>
            <h1>Session timed out. Please log in again.</h1>
            <form method="dialog">
               <button>Ok</button>
            </form>
         </dialog>
      );
   };

   useEffect(() => {
      localStorage.setItem("profiles", JSON.stringify(profiles));
   }, [profiles]);

   return (
      <div className="main">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login title="Login" setProfile={setProfile} timedoutDialog={timedoutDialog} />} />
               <Route
                  path="/create"
                  element={<CreateProfile title="Create Profile" setProfile={setProfile} profiles={profiles} dispatch={dispatch} />}
               />
               <Route path="/view" element={<ViewProfile title="View Profile" profile={profile} dispatch={dispatch} />} />
               <Route
                  path="/edit"
                  element={
                     <EditProfile title="Edit Profile" profile={profile} setProfile={setProfile} profiles={profiles} dispatch={dispatch} />
                  }
               />
            </Routes>
         </BrowserRouter>
         <TimedoutDialogHtml />
      </div>
   );
}

export default App;
