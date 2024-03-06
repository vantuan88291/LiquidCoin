import React from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, TextField } from "app/components"
import { colors } from "../../theme"
import { SectionItem } from "./section-item"
import { Result } from "./result"
import { useEntryContext, withEntryContext } from "./useData"

export const Entry = withEntryContext(function WelcomeScreen() {
  const { addMoreEntry, data, tickSize, setTickSize, leverage, setLeverage } = useEntryContext()
  const renderEntry = (item, index) => (
    <SectionItem index={index} key={index + "entry"} item={item} />
  )
  return (
    <View style={$container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TextField
            value={`${leverage}`}
            onChangeText={setLeverage}
            keyboardType="numbers-and-punctuation"
            label={"leverage (Eg: 20)"}
          />
          <TextField
            value={`${tickSize}`}
            onChangeText={setTickSize}
            containerStyle={$size}
            keyboardType="numbers-and-punctuation"
            label={"Tick size(decimal number of coin)"}
          />
          {data.map(renderEntry)}
          <TouchableOpacity onPress={addMoreEntry} style={$btn}>
            <Text preset="formLabel" text={"Add more entry"} />
          </TouchableOpacity>
          <Text preset="subheading" text={"Result:"} />
          <Result />
        </View>
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.background,
  padding: 10,
  height: "100%",
}
const $btn: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 6,
  backgroundColor: colors.palette.primary400,
  alignSelf: "flex-start",
  margin: 4,
  marginBottom: 10,
}
const $size: ViewStyle = {
  marginTop: 10,
  marginBottom: 15,
}
