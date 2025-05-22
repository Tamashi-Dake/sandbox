import * as yup from "yup";
import { handleCheckValidPhoneNumber } from "../../utils/handleCheckValidPhoneNumber";

export const testSchema = yup.object({
  example: yup.string().required("Example is required"),
  email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is required")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email must be at most 50 character")
    .test("no-space", "Email cannot be only spaces", (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .test("is-valid-phone-number", "Invalid phone number", (value) => {
      return value ? handleCheckValidPhoneNumber(value) : false;
    }),
});
