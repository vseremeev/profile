import { phoneNumberBeautify } from "helpers/utils";

const PhoneInput = ({ id, defaultValue }) => {
   const onTelInput = (e) => {
      if (e.target.validity.customError) {
         e.target.setCustomValidity("");
      }
      e.target.value = phoneNumberBeautify(e.target.value);
   };

   return <input type="tel" id={id} onInput={onTelInput} defaultValue={phoneNumberBeautify(defaultValue)} />;
};

export default PhoneInput;
