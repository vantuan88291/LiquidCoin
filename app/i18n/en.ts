const en = {
  menu: {
    home: "Home",
    market: "Markets",
    wallets: "Wallets",
    portfolio: "Portfolio",
    more: "More",
  },
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
    invalidPassword: "Password at least 6 characters",
    invalidLogin: "Please check your password or email!",
  },
  loginScreen: {
    signIn: "Sign In",
    signInUpper: "SIGN IN",
    enterDetails: "Please sign in to continue",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    remember: "Remember me",
    forgotPass: "Forgot your password?",
    registerAsk: "Don’t have an account yet? ",
    signup: "SIGN UP",
  },
}

export default en
export type Translations = typeof en
