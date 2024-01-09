export const phoneNumberBeautify = (phone) => {
   if (phone && phone !== "+") {
      phone = phone.replace(/[^\d]/g, "");
      phone = phone.length > 11 ? phone.slice(0, 11) : phone;
      if (phone.length > 0) {
         switch (true) {
            case phone.length === 1:
               return "+" + phone;
            case phone.length < 5:
               return "+" + phone.slice(0, 1) + " (" + phone.slice(1, phone.length);
            case phone.length < 8:
               return "+" + phone.slice(0, 1) + " (" + phone.slice(1, 4) + ") " + phone.slice(4, phone.length);
            default:
               return "+" + phone.slice(0, 1) + " (" + phone.slice(1, 4) + ") " + phone.slice(4, 7) + "-" + phone.slice(7, phone.length);
         }
      }
   }
   return phone;
};

export const phoneNumberUglify = (phone) => {
   return phone ? "+" + phone.replace(/[^\d]/g, "") : "";
};
