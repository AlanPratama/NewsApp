import React from 'react'
import WebView from 'react-native-webview'
import Constants from 'expo-constants';

export default function DetailNewsScreen(props) {
  let {link} = props.route.params
  
  return (
    <WebView style={{ flex: 1, marginTop: Constants.statusBarHeight }} source={{ uri: link }} />
  )
}