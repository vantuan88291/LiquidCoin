import React from "react"
import { LayoutAnimation, View, ViewStyle } from "react-native"
import CodePush from "react-native-code-push"
import { colors } from "../theme"

export const Update = () => {
  const [percent, setPercent] = React.useState(0)
  const codePushStatusDidChange = async (syncStatus) => {
    switch (syncStatus) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        break
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        break
      case CodePush.SyncStatus.UP_TO_DATE:
      case CodePush.SyncStatus.UPDATE_IGNORED:
        break
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        break
    }
  }
  const codePushDownloadDidProgress = (progress) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (progress.receivedBytes && progress.totalBytes) {
      const percent = (progress?.receivedBytes * 100) / progress?.totalBytes
      setPercent(percent)
    } else {
      setPercent(100)
    }
  }
  React.useEffect(() => {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    )
  }, [])
  const $perLoading: ViewStyle = React.useMemo(
    () => ({
      width: `${percent}%`,
    }),
    [percent],
  )
  if (percent > 0) {
    return (
      <View style={$loading}>
        <View style={[$loadingChild, $perLoading]} />
      </View>
    )
  }
  return null
}
const $loading: ViewStyle = {
  position: "absolute",
  top: 0,
  height: 50,
  backgroundColor: colors.errorBackground,
  width: "100%",
}
const $loadingChild: ViewStyle = {
  position: "absolute",
  height: 30,
  backgroundColor: colors.palette.secondary400,
}
