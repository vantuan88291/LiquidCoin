import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const LoginModel = types
  .model("Login")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Login extends Instance<typeof LoginModel> {}
export interface LoginSnapshotOut extends SnapshotOut<typeof LoginModel> {}
export interface LoginSnapshotIn extends SnapshotIn<typeof LoginModel> {}
export const createLoginDefaultModel = () => types.optional(LoginModel, {})
