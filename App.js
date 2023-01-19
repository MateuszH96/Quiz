/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *5037
 * @format
 * @flow strict-local
 */
import Riddle from './src/Riddle';
import { React, Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Result from './src/Results';
import MainScreen from './src/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import { FlatList } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorageOperate from './src/AsyncStorageOperate'

const Drawer = createDrawerNavigator()

export default class App extends Component {
  state = {
    end: true
  }
  constructor() {
    super();
    this.isEnd = true
    this.value = ''
    this.state = {
      end: true
    }
    this.getData('token2')
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  createBtns() {
    return (
      <FlatList
        data={testy}
        renderItem={({ item }) => (
          <Drawer.Screen name={item.name} component={Result} initialParams={{ results: tablicaWynikow }} />
        )}
      />
    )
  }
  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value === null) {
        this.setState({ end: false })
      }
    } catch (err) {
      console.log(err)
    }
  }
  saveData = async (key, value, a) => {
    try {
      await AsyncStorage.setItem(key, value)
      this.setState({ end: true })
    } catch (err) {
      console.log(err)
    }
  }
  createMainScreen() {
    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Główny Ekran" component={MainScreen}/>
          <Drawer.Screen name="Wyniki" component={Result} />
          <Drawer.Screen name="Pytanie" component={Riddle} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
  createReg() {
    return (
      <View>
        <Text>
          REGULAMIN
        </Text>
        <Button
          title='OK'
          onPress={this.saveData.bind('', 'token2', 'ok')}
        />
      </View>
    )
  }
  render() { 
    return this.state.end ? this.createMainScreen() : this.createReg()
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})