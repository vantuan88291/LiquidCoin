import {Icon, Text, TextField} from "../../components";
import {colors} from "../../theme";
import {TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import React from "react";
import {useEntryContext} from "./useData";

export const SectionItem = ({item, index}) => {
  const {removeEntry, onchangeInput} = useEntryContext()

  const remove = () => {
    removeEntry(index)
  }
  const onChangeEntry = (text) => {
    onchangeInput(index, 'entry', text)
  }
  const onChangeVolume = (text) => {
    onchangeInput(index, 'volume', text)
  }
  return (
    <View style={$container}>
      <Text style={$ps} preset='subheading' text={`${index + 1}.`}/>
      <TextField
        value={item.entry}
        onChangeText={onChangeEntry}
        placeholder={'Entry'}
        placeholderTextColor={colors.palette.neutral400}
        containerStyle={$entry}
        keyboardType='numbers-and-punctuation'
      />
      <TextField
        value={item.volume}
        onChangeText={onChangeVolume}
        placeholderTextColor={colors.palette.neutral400}
        placeholder={'Volume'}
        containerStyle={$flex}
        keyboardType='numbers-and-punctuation'
      />
      <TouchableOpacity onPress={remove} style={$remove}>
        <Icon size={22} color={colors.palette.primary400} icon='remove' />
      </TouchableOpacity>
    </View>
  )
}
const $container: ViewStyle = {
  flexDirection: 'row',
  marginTop: 5,
  marginBottom: 10,
}
const $flex: ViewStyle = {
  flex: 1
}
const $entry: ViewStyle = {
  ...$flex,
  marginRight: 10,
  marginLeft: 5,
}
const $remove: ViewStyle = {
  paddingLeft: 8,
  alignSelf: 'center'
}
const $ps: TextStyle = {
  width: 40
}
