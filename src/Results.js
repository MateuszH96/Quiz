import { Component } from "react";
import { Text,StyleSheet, View, FlatList, ScrollView} from "react-native";
export default class Result extends Component{
    constructor({route}){
        super()
        this.results = route.params.results
    }
    editText(input){
        tmp = input.split(' ')
        input = tmp[0].replace('-','\n')
        return input
    }
    createRowsResults(){
        return(
                <FlatList
                data = {this.results}
                renderItem ={({item}) => (
                    <View style={styles.itemList}>
                        <Text style={styles.nick}>{item.nick}</Text>
                        <View style={styles.oneLine}>
                            <Text style={styles.score}>Punkty{'\n'}{item.score}/{item.total}</Text>
                            <Text style={styles.date}>{this.editText(item.createdOn)}</Text>
                        </View>
                        <Text style={styles.type}>Typ: {item.type}</Text>
                    </View>
                )}
                />
        )
    }
    render (){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>
                        Tablica Wyników
                    </Text>
                </View>
                <View style={styles.content}>
                    {this.createRowsResults()}
                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'black'
    },
    titleTxt:{
        fontSize: 30,
        fontWeight:'bold'
    },
    content:{
        flex:9,
        marginVertical:5
    },
    itemList:{
        flex: 1,
        backgroundColor: 'lightgrey',
        marginTop: 15
    },
    nick:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    oneLine:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    score:{
        flex: 1,
        textAlign: 'center',
        fontSize:30
    },
    date:{
        flex: 1,
        textAlign: 'center',
        fontSize: 30
    },
    type:{
        textAlign:'center',
        marginTop: 10
    }
})