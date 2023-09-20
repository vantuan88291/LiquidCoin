import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { commons } from "../utils/commons"
import { RULES_LOGIN } from "../utils/validates/login-validate"
import { validate } from "../utils/validate"
import { api } from "../services/api"
import { translate } from "../i18n"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props(commons.ERROR_MSG)
  .props({
    authToken: types.maybe(types.string),
    paramsLogin: types.optional(
      types.model({
        email: types.maybeNull(types.string),
        password: types.maybeNull(types.string),
      }),
      {},
    ),
    loading: false,
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setLoading(loading: boolean) {
      store.loading = loading
    },
    setEmail(value: string) {
      store.paramsLogin.email = value.replace(/ /g, "")
      store.errorMessage.delete("email")
    },
    setPass(value: string) {
      store.paramsLogin.password = value.replace(/ /g, "")
      store.errorMessage.delete("password")
    },
    logout() {
      store.authToken = undefined
    },
    resetParams: () => {
      applySnapshot(store.paramsLogin, {})
    },
  }))
  .actions((self) => ({
    onLogin: flow(function* () {
      self.errorMessage.clear()
      const error = validate(RULES_LOGIN(), { ...self.paramsLogin })
      if (Object.keys(error).length) {
        self.errorMessage.replace(error)
        return
      }
      self.setLoading(true)
      const result = yield api.doLogin(self.paramsLogin)
      if (result.kind === "ok") {
        self.setAuthToken(result.data?.data?.token)
      } else {
        self.errorMessage.replace({
          password: [translate("errors.invalidLogin")],
        })
      }
      self.setLoading(false)
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
