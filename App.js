import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import Events from './components/Events/Events'
import { RkTheme } from 'react-native-ui-kitten'
import { darkTheme } from './assets/darkTheme'

export default class HomeScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Events />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

RkTheme.setTheme(darkTheme, null)
