import {
  type CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";

export const handleCheckValidPhoneNumber = (
  phoneNumber: string,
  defaultCountry?:
    | CountryCode
    | {
        defaultCountry?: CountryCode;
        defaultCallingCode?: string;
        extract?: boolean;
      }
) => {
  const validPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;

  const checkPhoneNumber = parsePhoneNumberFromString(
    validPhoneNumber,
    defaultCountry
  );

  return checkPhoneNumber?.isPossible() && checkPhoneNumber?.isValid();
};
