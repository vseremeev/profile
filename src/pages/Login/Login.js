import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSessionTimeout from "hooks/useSessionTImeout";
import "./Login.css";
import "pages/pages.css";

const Login = ({ title, setProfile, timedoutDialog }) => {
   const navigate = useNavigate();
   const { startTimeout, cancelTimeout } = useSessionTimeout();
   useEffect(() => {
      document.title = title;
   }, [title]);

   const onSubmit = (e) => {
      e.preventDefault();

      let profiles = localStorage.getItem("profiles");
      profiles = profiles ? JSON.parse(profiles) : [];
      if (profiles) {
         const profile = profiles.find((profile) => profile.email === e.target.email.value);
         if (profile && profile.password === e.target.password.value) {
            setProfile(profile);
            cancelTimeout();
            startTimeout(60000, timedoutDialog);
            navigate("/view");
         } else {
            e.target.password.setCustomValidity("Email or password does not match. Please try again or create new profile.");
            e.target.password.reportValidity();
         }
      } else {
         e.target.password.setCustomValidity("Email or password does not match. Please try again or create new profile.");
         e.target.password.reportValidity();
      }
   };

   const onInput = (e) => {
      if (e.target.validity.customError) {
         e.target.setCustomValidity("");
      }
   };

   return (
      <div className="wrapper login-wrapper">
         <h1>Login</h1>
         <form onSubmit={onSubmit}>
            <div className="profile-item">
               <label htmlFor="email">Email</label>
               <input type="email" id="email" placeholder="Type your email" onInput={onInput} required />
            </div>
            <div className="profile-item">
               <label htmlFor="password">Password</label>
               <input type="password" id="password" placeholder="Type your password" onInput={onInput} required />
            </div>
            <button type="submit" id="login">
               Login
            </button>
            {/* {error && <div className="errorMessage">{error}</div>} */}
         </form>
         <div className="login-create-link">
            Or <Link to="/create">Create new profile</Link>
         </div>
      </div>
   );
};

export default Login;
