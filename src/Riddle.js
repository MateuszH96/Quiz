import { Component } from "react";
import {Text, View,TouchableOpacity,StyleSheet} from "react-native";
export default class Riddle extends Component{

    constructor({route}){
        super()
        obj= route.params
        this.rid = obj.riddle
        this.title = obj.title
        this.state={
            time: this.rid.duration
        }
        this.onPress = this.onPress.bind(this)
    }

    onPress(answer){
        console.log(answer)
    }

    createBtn(ans){
        let txt = ans.content
        let val = ans.isCorrect
        return (
            <TouchableOpacity style={styles.btn} onPress={() => this.onPress(val)}>
            <View style={styles.btnStyle}>
                <Text>
                    {txt}
                </Text>
            </View>
        </TouchableOpacity>)
    }

    createBtns(){
        return(
            <View style={styles.answersRow}>
               <View style={styles.answersCol}>
                {this.createBtn(this.rid.answers[0])}
                {this.createBtn(this.rid.answers[1])}
               </View>
               <View style={styles.answersCol}>
                {this.createBtn(this.rid.answers[2])}
                {this.createBtn(this.rid.answers[3])}
               </View>
            </View>
        )
    }

    createTxtView(){
        return (
        <View style={styles.questionRows}>
            <View style={styles.title}>
                    <Text style={styles.valueTxtTitle}>{this.title}</Text>
            </View>
            <View style={styles.questionValue}>
                <Text style={styles.valueTxtQuestion}>
                    {this.rid.question}
                </Text>
            </View>
        </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.question}>  
                    {this.createTxtView()}
                </View>
                <View style={styles.answers}>
                    {
                        this.createBtns()
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    question:{
        flex:1
    },
    answers:{
        flex: 1,
    },
    questionRows:{
        flex:1,
        flexDirection: 'column'
    },
    answersRow:{
        flex: 1,
        flexDirection:'column'
    },
    title:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionValue:{
        flex: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    valueTxtQuestion:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold'
    },
    valueTxtTitle:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight:'bold'
    },
    answersCol:{
        flex: 1,
        flexDirection: 'row'
    },
    btn:{
        flex: 1,
        paddingVertical:20,
        paddingHorizontal: 10
    },
    btnStyle:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'black',
        backgroundColor: 'lightgrey'
    }
})