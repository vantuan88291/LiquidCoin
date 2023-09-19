import { LoginModel } from "./Login"

test("can be created", () => {
  const instance = LoginModel.create({})

  expect(instance).toBeTruthy()
})
