import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { MoreScreen, PortfolioScreen, WalletsScreen, MarketsScreen, HomeScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  Home: undefined
  Markets: undefined
  Wallets: undefined
  Portfolio: undefined
  More: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.palette.blueActive,
        tabBarInactiveTintColor: colors.palette.blueDarklbl,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("menu.home"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="home"
              color={focused ? colors.palette.blueActive : colors.palette.blueDarklbl}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Markets"
        component={MarketsScreen}
        options={{
          tabBarLabel: translate("menu.market"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="market"
              color={focused ? colors.palette.blueActive : colors.palette.blueDarklbl}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wallets"
        component={WalletsScreen}
        options={{
          tabBarLabel: translate("menu.wallets"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="wallets"
              color={focused ? colors.palette.blueActive : colors.palette.blueDarklbl}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: translate("menu.portfolio"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="portfolio"
              color={focused ? colors.palette.blueActive : colors.palette.blueDarklbl}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: translate("menu.more"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="more"
              color={focused ? colors.palette.blueActive : colors.palette.blueDarklbl}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.59,
  shadowRadius: 9.0,
  elevation: 24,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
