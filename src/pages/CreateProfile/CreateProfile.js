import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "components/PhoneInput";
import { phoneNumberUglify } from "helpers/utils";
import "./CreateProfile.css";
import "pages/pages.css";

const CreateProfile = ({ title, profiles, setProfile, dispatch }) => {
   // const navigate = useNavigate();
   const dialog = useRef();
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
      dispatch({ type: "add", profile: newProfile });
      setProfile(newProfile);
      e.target.reset();
      dialog.current.showModal();
      //navigate("/view");
   };

   const onEmailInput = (e) => {
      if (e.target.validity.customError) {
         e.target.setCustomValidity("");
      }
   };

   const onCloseClick = () => {
      dialog.current.close();
   };

   return (
      <div className="wrapper create-wrapper">
         <h1>Create Profile</h1>
         <form onSubmit={onSubmit}>
            <div className="profile-item">
               <label htmlFor="email">
                  Email <span aria-label="required">*</span>
               </label>
               <input type="email" id="email" onInput={onEmailInput} required />
            </div>
            <div className="profile-item">
               <label htmlFor="password">
                  Password <span aria-label="required">*</span>
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  minLength={10}
                  maxLength={32}
                  pattern="^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=.*[!@#$%^&*\(\)_+\{\}\[\]:;<>,\.?~\\\/\-]).{10,32}$"
                  title="Password must contain at least 2 uppercase letters, 2 numbers, and 1 special character, and be between 10 and 32 characters long."
                  autoComplete="new-password"
                  required
               />
            </div>
            <div className="profile-item">
               <label htmlFor="name">
                  Full name <span aria-label="required">*</span>
               </label>
               <input type="text" id="name" minLength={3} required />
            </div>
            <div className="profile-item">
               <label htmlFor="phone">Phone number</label>
               <PhoneInput id="phone" />
            </div>
            <fieldset>
               <legend>
                  Choose your favorite color <span aria-label="required">*</span>
               </legend>
               <div className="color-item">
                  <input type="radio" id="blue" name="color" value="blue" required />
                  <label htmlFor="blue">Blue</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="red" name="color" value="red" required />
                  <label htmlFor="red">Red</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="green" name="color" value="green" required />
                  <label htmlFor="green">Green</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="yellow" name="color" value="yellow" required />
                  <label htmlFor="yellow">Yellow</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="purple" name="color" value="purple" required />
                  <label htmlFor="purple">Purple</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="black" name="color" value="black" required />
                  <label htmlFor="black">Black</label>
               </div>
               <div className="color-item">
                  <input type="radio" id="orange" name="color" value="orange" required />
                  <label htmlFor="orange">Orange</label>
               </div>
            </fieldset>
            <button type="submit">Create Profile</button>
         </form>
         <dialog ref={dialog}>
            <h1>Profile successfully created.</h1>
            <p>
               Please <Link to="/">login</Link> to view the profile.
            </p>
            <form method="dialog">
               <button className="button-cancel" onClick={onCloseClick}>
                  Close
               </button>
            </form>
         </dialog>
         <div className="login-create-link">
            Or <Link to="/">Login</Link>
         </div>
      </div>
   );
};

export default CreateProfile;
