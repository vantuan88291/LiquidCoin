import { translate } from "../../i18n"
import { ValidationRules } from "../validate"

export const RULES_LOGIN: () => ValidationRules = () => ({
  email: {
    presence: {
      message: translate("errors.invalidEmail"),
      allowEmpty: false,
    },
    email: {
      message: translate("errors.invalidEmail"),
    },
  },
  password: {
    presence: {
      message: translate("errors.invalidPassword"),
      allowEmpty: false,
    },
    length: {
      minimum: 6,
      message: translate("errors.invalidPassword"),
    },
  },
})
