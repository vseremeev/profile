import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "components/PhoneInput";
import { phoneNumberUglify } from "helpers/utils";
import "./EditProfile.css";
import "pages/pages.css";

const EditProfile = ({ title, profile, setProfile, profiles, dispatch }) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!profile) navigate("/");
   }, [profile, navigate]);

   useEffect(() => {
      document.title = title;
   }, [title]);

   const onSubmit = (e) => {
      e.preventDefault();
      const newProfile = {
         email: e.target.email.value,
         password: e.target.password.value,
         name: e.target.name.value,
         phone: phoneNumberUglify(e.target.phone.value),
         color: e.target.color.value,
      };

      const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      if (!emailPattern.test(e.target.email.value)) {
         e.target.email.setCustomValidity("Please enter valid email address.");
         e.target.reportValidity();
         return;
      }
      if (newProfile.phone !== "" && newProfile.phone.length !== 12) {
         e.target.phone.setCustomValidity("Please add valid phone number or leave it empty. Valid number example: +1 (XXX) XXX-XXXX.");
         e.target.reportValidity();
         return;
      }
      if (profiles.some((p) => p.email === newProfile.email)) {
         e.target.email.setCustomValidity("This email already exists. Please choose another email or try to login.");
         e.target.reportValidity();
         return;
      }
      dispatch({ type: "edit", profile: newProfile, old: profile });
      setProfile(newProfile);
      navigate("/view");
   };

   const onEmailInput = (e) => {
      if (e.target.validity.customError) {
         e.target.setCustomValidity("");
      }
   };

   const onCancelClick = (e) => {
      e.preventDefault();
      navigate("/view");
   };

   if (!profile) return;

   return (
      <div className="wrapper profile-wrapper">
         <h1 style={{ color: profile?.color }}>Edit {profile?.name} Profile</h1>
         <form onSubmit={onSubmit}>
            <div className="profile-inputs">
               <div className="profile-inputs-top">
                  <div className="profile-item">
                     <label htmlFor="email">Email</label>
                     <input type="email" id="email" onInput={onEmailInput} defaultValue={profile?.email} required />
                  </div>

                  <div className="profile-item">
                     <label htmlFor="password">Password</label>
                     {/* <input type="password" id="password" minLength="10" maxLength="32" required /> */}
                     <input
                        type="password"
                        id="password"
                        name="password"
                        minLength={10}
                        maxLength={32}
                        pattern="^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=.*[!@#$%^&*\(\)_+\{\}\[\]:;<>,\.?~\\\/\-]).{10,32}$"
                        title="Password must contain at least 2 uppercase letters, 2 numbers, and 1 special character, and be between 10 and 32 characters long."
                        defaultValue={profile?.password}
                        required
                     />
                  </div>
                  <div className="profile-item">
                     <label htmlFor="name">Full name</label>
                     <input type="text" id="name" minLength={3} defaultValue={profile?.name} required />
                  </div>
                  <div className="profile-item">
                     <label htmlFor="phone">Phone number</label>
                     <PhoneInput id="phone" defaultValue={profile?.phone} />
                  </div>
               </div>
               <fieldset>
                  <legend>Choose your favorite color</legend>
                  <div className="color-item">
                     <input type="radio" id="blue" name="color" value="blue" defaultChecked={profile?.color === "blue"} required />
                     <label htmlFor="blue">Blue</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="red" name="color" value="red" defaultChecked={profile?.color === "red"} required />
                     <label htmlFor="red">Red</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="green" name="color" value="green" defaultChecked={profile?.color === "green"} required />
                     <label htmlFor="green">Green</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="yellow" name="color" value="yellow" defaultChecked={profile?.color === "yellow"} required />
                     <label htmlFor="yellow">Yellow</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="purple" name="color" value="purple" defaultChecked={profile?.color === "purple"} required />
                     <label htmlFor="purple">Purple</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="black" name="color" value="black" defaultChecked={profile?.color === "black"} required />
                     <label htmlFor="black">Black</label>
                  </div>
                  <div className="color-item">
                     <input type="radio" id="orange" name="color" value="orange" defaultChecked={profile?.color === "orange"} required />
                     <label htmlFor="orange">Orange</label>
                  </div>
               </fieldset>
            </div>
            <div className="profile-buttons">
               <button className="button-cancel" onClick={onCancelClick}>
                  Cancel
               </button>
               <button type="submit">Save</button>
            </div>
         </form>
      </div>
   );
};

export default EditProfile;
