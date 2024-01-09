import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { phoneNumberBeautify } from "helpers/utils";
import "./ViewProfile.css";
import "pages/pages.css";

const ViewProfile = ({ title, profile, dispatch }) => {
   const navigate = useNavigate();
   const dialog = useRef();

   useEffect(() => {
      if (!profile) navigate("/");
   }, [profile, navigate]);

   useEffect(() => {
      document.title = title;
   }, [title]);

   const onEditCLick = () => {
      navigate("/edit");
   };

   const onDeleteClick = () => {
      dialog.current.showModal();
   };

   const onDeleteCancelClick = () => {
      dialog.current.close();
   };

   const onDeleteConfirmClick = (e) => {
      e.preventDefault();
      dispatch({ type: "delete", profile: profile });
      window.location.replace("/");
   };

   if (!profile) return;

   return (
      <div className="wrapper profile-wrapper">
         <h1 style={{ color: profile?.color }}>{profile?.name} Profile</h1>
         <div className="profile-data">
            <div className="profile-item">
               <div className="profile-item-label">Email</div>
               <div className="profile-item-data">{profile?.email}</div>
            </div>
            <div className="profile-item">
               <div className="profile-item-label">Password</div>
               <div className="profile-item-data">****</div>
            </div>
            <div className="profile-item">
               <div className="profile-item-label">Full name</div>
               <div className="profile-item-data">{profile?.name}</div>
            </div>
            <div className="profile-item">
               <div className="profile-item-label">Phone number</div>
               <div className="profile-item-data">{phoneNumberBeautify(profile?.phone)}</div>
            </div>
            <div className="profile-item profile-item-color">
               <div className="profile-item-label">Color</div>
               <div className="profile-item-data">{profile?.color}</div>
            </div>
         </div>
         <div className="profile-buttons">
            <button className="profile-edit" onClick={onEditCLick}>
               Edit
            </button>
            <button className="button-delete" onClick={onDeleteClick}>
               Delete
            </button>
         </div>
         <dialog ref={dialog} className="two-buttons">
            <h1>Are you sure you want to delete this profile?</h1>
            <form method="dialog">
               <button className="button-cancel" onClick={onDeleteCancelClick}>
                  No
               </button>
               <button onClick={onDeleteConfirmClick}>Yes</button>
            </form>
         </dialog>
      </div>
   );
};

export default ViewProfile;
