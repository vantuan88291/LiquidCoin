import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Image, ImageStyle, ScrollView, TextInput, TextStyle, ViewStyle, View } from "react-native"
import {
  Button,
  Header,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
  Toggle,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, images, spacing, windowHeight, windowWidth } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral100}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const LeftAccessoryUser = useMemo(
    () =>
      function LeftAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon="user"
            color={colors.palette.neutral100}
            containerStyle={props.style}
            size={20}
          />
        )
      },
    [],
  )
  const LeftAccessoryPass = useMemo(
    () =>
      function LeftAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon="password"
            color={colors.palette.neutral100}
            containerStyle={props.style}
            size={20}
          />
        )
      },
    [],
  )

  return (
    <Screen preset="fixed" statusBarStyle="light" safeAreaEdges={[]}>
      <Image style={$bg} source={images.bg} />
      <ScrollView style={$screenContentContainer}>
        <View style={$logoView}>
          <Image style={$logo} source={images.logo} />
          <Text text={"Sign in"} color={colors.palette.neutral100} preset="heading" />
          <Text
            text={"Please sign in to continue"}
            color={colors.palette.neutral100}
            preset="formLabel"
          />
        </View>

        <TextField
          LeftAccessory={LeftAccessoryUser}
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          LeftAccessory={LeftAccessoryPass}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          placeholder="Password"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />
        <View style={$rowMore}>
          <Toggle
            containerStyle={$toggerStyle}
            value={false}
            labelPosition={"right"}
            label={"Remember me"}
          />
          <Button preset="normal">
            <Text text={"Forgot your password?"} preset="bold" color={colors.palette.neutral100} />
          </Button>
        </View>
        <Button
          testID="login-button"
          text="SIGN IN"
          style={$tapButton}
          textStyle={$lblLogin}
          preset="reversed"
          onPress={login}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: spacing.lg,
            marginBottom: spacing.sm,
          }}
        >
          <Text color={colors.palette.neutral100} text={"Don’t have an account yet? "} />
          <Button preset="normal">
            <Text text={"SIGN UP"} preset="bold" color={colors.palette.neutral100} />
          </Button>
        </View>
      </ScrollView>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.sm,
}

const $logoView: TextStyle = {
  alignItems: "center",
  marginTop: spacing.xl,
  marginBottom: spacing.xxl,
}
const $bg: ImageStyle = {
  position: "absolute",
  resizeMode: "stretch",
  width: windowWidth,
  height: windowHeight,
}
const $logo: ImageStyle = {
  width: 55,
  height: 55,
}
const $lblLogin: TextStyle = {
  color: colors.palette.blueActive,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}
const $toggerStyle: ViewStyle = {
  position: "absolute",
  left: 0,
}
const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.blueLight,
}
const $rowMore: ViewStyle = {
  width: "100%",
  flex: 1,
  alignItems: "flex-end",
  marginBottom: spacing.xxxl,
}

// @demo remove-file
