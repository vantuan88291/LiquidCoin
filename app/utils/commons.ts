import { types } from "mobx-state-tree"

export const commons = {
  TOKEN: "TOKEN",
  ERROR_MSG: {
    errorMessage: types.map(types.optional(types.array(types.string), [])),
  },
}
