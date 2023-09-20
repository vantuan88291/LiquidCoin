import { types } from "mobx-state-tree"
import { Platform } from "react-native"

export const commons = {
  TOKEN: "TOKEN",
  ERROR_MSG: {
    errorMessage: types.map(types.optional(types.array(types.string), [])),
  },
}

export const isIos = Platform.OS === "ios"
