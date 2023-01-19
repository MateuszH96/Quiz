import { View, StyleSheet, Text, FlatList, Touchable } from "react-native";
import { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import HttpRequest from "./HttpRequest";


export default class MainScreen extends Component{
    Navigation= null
    Link = 'https://tgryl.pl/quiz/tests'
    constructor({navigation}){
        super()
        Navigation = navigation

        this.state={
            tests: []
        }
        this.onPress = this.onPress.bind(this)
    }
    componentDidMount(){
            fetch(this.Link).then(res =>res.json())
            .then(
                (response) => {
                    const data = response
                    const test = data.map((element) => element)
                    test.forEach(element => {
                        this.state.tests.push(element)
                    });
                    this.setState({test: this.state.tests})
                },
                (err)=>{
                    console.log(err)
                })
    }
    createTags(input){
        return(
            <FlatList
                horizontal={true}
                data = {input}
                renderItem = {({item}) => (
                    <Text style={styles.tagsQuiz}>#{item+' '}</Text>
                )}
            />
        )
    }
    onPress(valId,valName){
        Navigation.navigate('Pytanie', {id: valId, nameQuiz: valName})
    }
    createBtns(){
        return(<FlatList
            data = {this.state.tests}
            extraData ={this.state.tests}
            renderItem ={({item}) => (
                <TouchableOpacity 
                    style={styles.flatListElementContainer}
                    onPress={() => this.onPress(item.id,item.name)}
                    >
                    <View>
                        <Text style={styles.nameQuiz}>
                            {item.name}
                        </Text>
                    </View>
                    <View>
                        {this.createTags(item.tags)}
                    </View>
                    <View>
                        <Text style={styles.desc}>
                            {item.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />)
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text  style={styles.titleTxt}>
                        Główny Ekran
                    </Text>
                </View>
                <View style={styles.content}>
                    {this.createBtns()}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor:'black',
        borderBottomWidth: 0.2
    },
    titleTxt:{
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold'
    },
    content:{
        flex:8
    },
    flatListElementContainer:{
        flex:1,
        backgroundColor: 'white',
        marginTop: 10,
        flexDirection: 'column',
        marginHorizontal: 10,
        paddingHorizontal: 5,
        paddingVertical:5,
        borderWidth: 2
    },
    nameQuiz:{
        fontSize: 30,
        fontFamily: 'Teko-Bold'

    },
    tagsQuiz:{
        color: 'blue',
        marginVertical:15,
        marginHorizontal: 15
    },
    desc:{fontSize: 10,
        fontFamily:'KaushanScript-Regular'
    }
})