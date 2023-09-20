import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  ImageStyle,
  ScrollView,
  TextInput,
  TextStyle,
  ViewStyle,
  View,
  ActivityIndicator,
} from "react-native"
import {
  Button,
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

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [remember, setRemember] = useState(false)
  const { authenticationStore } = useStores()

  useEffect(() => {
    return () => {
      authenticationStore.resetParams()
    }
  }, [])

  const onToggle = () => {
    setRemember(!remember)
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
          <Text tx={"loginScreen.signIn"} color={colors.palette.neutral100} preset="heading" />
          <Text
            tx={"loginScreen.enterDetails"}
            color={colors.palette.neutral100}
            preset="formLabel"
          />
        </View>

        <TextField
          LeftAccessory={LeftAccessoryUser}
          value={authenticationStore.paramsLogin.email}
          onChangeText={authenticationStore.setEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholderTx="loginScreen.emailFieldLabel"
          helper={authenticationStore.errorMessage.get("email")}
          status={authenticationStore.errorMessage.get("email") != null ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authenticationStore.paramsLogin.password}
          LeftAccessory={LeftAccessoryPass}
          onChangeText={authenticationStore.setPass}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          placeholderTx="loginScreen.passwordFieldLabel"
          helper={authenticationStore.errorMessage.get("password")}
          status={authenticationStore.errorMessage.get("password") != null ? "error" : undefined}
          onSubmitEditing={authenticationStore.onLogin}
          RightAccessory={PasswordRightAccessory}
        />
        <View style={$rowMore}>
          <Toggle
            onPress={onToggle}
            containerStyle={$toggerStyle}
            value={remember}
            labelPosition={"right"}
            labelTx={"loginScreen.remember"}
          />
          <Button preset="normal">
            <Text tx={"loginScreen.forgotPass"} preset="bold" color={colors.palette.neutral100} />
          </Button>
        </View>
        <Button
          testID="login-button"
          tx="loginScreen.signInUpper"
          disabled={authenticationStore.loading}
          style={$tapButton}
          RightAccessory={(style) =>
            authenticationStore.loading && (
              <ActivityIndicator
                style={style.style}
                color={colors.palette.blueActive}
                size="small"
              />
            )
          }
          textStyle={$lblLogin}
          preset="reversed"
          onPress={authenticationStore.onLogin}
        />
        <View style={$rowFooter}>
          <Text color={colors.palette.neutral100} tx={"loginScreen.registerAsk"} />
          <Button preset="normal">
            <Text tx={"loginScreen.signup"} preset="bold" color={colors.palette.neutral100} />
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
const $rowFooter: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: spacing.lg,
  marginBottom: spacing.sm,
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
