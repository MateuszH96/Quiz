import { View, StyleSheet, Text, FlatList, Touchable } from "react-native";
import { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MainScreen extends Component{
    constructor(){
        super()
        this.colInfo = [
            {"id":"62032610069ef9b2616c761e","name":"Moda na sukces","description":"Quiz z najważniejszych wydarzeń serialu.","tags":["tv","tasiemiec","serial"],"level":"średni","numberOfTasks":5},
            {"id":"62032610069ef9b2616c761c","name":"Tranzystor bipolarny i polowy","description":"Test sprawdzający podstawową wiedzę z zakresu elektroniki, związany z transytorami bipolarnymi i polowymi.","tags":["elektronika","fizyka"],"level":"średni","numberOfTasks":15},
            {"id":"62032610069ef9b2616c761d","name":"Wodzowie i dowódcy starożytnego Rzymu","description":"Odgadnij prawidłowe nazwiska lub konkretnym nazwiskom przyporządkuj odpowiednie wydarzenia.","tags":["historia","starożytny Rzym"],"level":"trudny","numberOfTasks":10},
            {"id":"62032610069ef9b2616c761b","name":"Zagadki matematyczne","description":"Bardzo szybki test sprawdzający podstawową wiedze z matematyki.","tags":["matematyka"],"level":"podstawowy","numberOfTasks":10}
    ]
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
    createBtns(){
        return(<FlatList
            data = {this.colInfo}
            renderItem ={({item}) => (
                <TouchableOpacity style={styles.flatListElementContainer}>
                    <View>
                        <Text style={styles.nameQuiz}>
                            {item.name}
                        </Text>
                    </View>
                    <View>
                        {this.createTags(item.tags)}
                    </View>
                    <View>
                        <Text>
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
        fontWeight: 'bold'

    },
    tagsQuiz:{
        color: 'blue',
        marginVertical:15,
        marginHorizontal: 15
    }
})