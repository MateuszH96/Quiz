/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *5037
 * @format
 * @flow strict-local
 */
import Riddle from './src/Riddle';
import {React, Component } from 'react'; 
import { View, StyleSheet } from 'react-native';
import Result from './src/Results';
import MainScreen from './src/MainScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageOperate from './src/AsyncStorageOperate';
import SplashScreen from 'react-native-splash-screen'

const Drawer = createDrawerNavigator()
obj ={
  "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
  "answers":[
    {
      "content": "LUCJUSZ CYNNA",
      "isCorrect": true
      },
      {
      "content": "JULIUSZ CEZAR",
      "isCorrect": false
      },
      {
      "content": "LUCJUSZ MURENA",
      "isCorrect": false
      },
      {
      "content": "MAREK KRASSUS",
      "isCorrect": false
      }
  ],
  "duration": 30
}

tablicaWynikow =[
  {"nick":"asdf3000","score":2,"total":20,"type":"historia","createdOn":"2020-11-21 00:25:26","updatedOn":null,"id":"62032610069ef9b2616c7620"},
  {"nick":"Mary","score":4,"total":20,"type":"historia","createdOn":"2020-11-23 16:20:52","updatedOn":null,"id":"62032610069ef9b2616c7625"},
  {"nick":"Kasia","score":20,"total":20,"type":"historia","createdOn":"2020-11-22 05:54:56","updatedOn":null,"id":"62032610069ef9b2616c7621"},
  {"nick":"Sue","score":9,"total":10,"type":"fizyka","createdOn":"2020-11-25 00:21:13","updatedOn":null,"id":"62032610069ef9b2616c7628"},
  {"nick":"Marek","score":18,"total":20,"type":"historia","createdOn":"2020-11-22 08:32:27","updatedOn":null,"id":"62032610069ef9b2616c761f"},
  {"nick":"Dean","score":7,"total":20,"type":"historia","createdOn":"2020-11-23 14:16:38","updatedOn":null,"id":"62032610069ef9b2616c7626"},
  {"nick":"Hak32","score":16,"total":25,"type":"muzyka","createdOn":"2020-11-22 08:15:06","updatedOn":null,"id":"62032610069ef9b2616c7624"},
  {"nick":"Marek","score":9,"total":25,"type":"muzyka","createdOn":"2020-11-29 19:07:09","updatedOn":null,"id":"62032610069ef9b2616c7629"},
  {"nick":"Basia","score":14,"total":10,"type":"fizyka","createdOn":"2020-11-22 11:09:21","updatedOn":null,"id":"62032610069ef9b2616c7622"}
]
testy = [
  {"id":"62032610069ef9b2616c761e","name":"Moda na sukces","description":"Quiz z najważniejszych wydarzeń serialu.","tags":["tv","tasiemiec","serial"],"level":"średni","numberOfTasks":5},
  {"id":"62032610069ef9b2616c761c","name":"Tranzystor bipolarny i polowy","description":"Test sprawdzający podstawową wiedzę z zakresu elektroniki, związany z transytorami bipolarnymi i polowymi.","tags":["elektronika","fizyka"],"level":"średni","numberOfTasks":15},
  {"id":"62032610069ef9b2616c761d","name":"Wodzowie i dowódcy starożytnego Rzymu","description":"Odgadnij prawidłowe nazwiska lub konkretnym nazwiskom przyporządkuj odpowiednie wydarzenia.","tags":["historia","starożytny Rzym"],"level":"trudny","numberOfTasks":10},
  {"id":"62032610069ef9b2616c761b","name":"Zagadki matematyczne","description":"Bardzo szybki test sprawdzający podstawową wiedze z matematyki.","tags":["matematyka"],"level":"podstawowy","numberOfTasks":10}
]
export default class App extends Component{
  constructor () {
    super();
  }
  componentDidMount() {
      SplashScreen.hide();
  }
  render () {
    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{headerShown: false}}>
          <Drawer.Screen name="Główny Ekran" component={MainScreen} initialParams={{tests: testy}}/>
          <Drawer.Screen name="Wyniki" component={Result} initialParams={{results: tablicaWynikow}}/>
          <Drawer.Screen name="Pytanie" component={Riddle} initialParams={{riddle: obj, title: "Historia"}}/>
        </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
  }
})