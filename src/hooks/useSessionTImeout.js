import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useSessionTimeout = () => {
   const [timeoutId, setTimeoutId] = useState(null);
   const navigate = useNavigate();

   const startTimeout = (duration = 60000, timedoutDialog) => {
      const id = setTimeout(() => {
         navigate("/");
         if (timedoutDialog) {
            timedoutDialog.current.showModal();
         } else {
            alert("Session timed out.");
         }
      }, duration);

      setTimeoutId(id);
   };

   const cancelTimeout = () => {
      clearTimeout(timeoutId);
      setTimeoutId(null);
   };

   useEffect(() => {
      return () => {
         clearTimeout(timeoutId);
      };
   }, [timeoutId]);

   return { startTimeout, cancelTimeout };
};

export default useSessionTimeout;
