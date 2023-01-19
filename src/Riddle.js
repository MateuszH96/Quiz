import { CommonActions } from "@react-navigation/native";
import { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button, Alert } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Global from "./Global";
import HttpRequest from './HttpRequest'
const _ = require("lodash")
export default class Riddle extends Component {
    Navigation = null
    
    constructor({ route, navigation }) {
        super()
        this.state = {
            //tests:{"question":"Kiedy okazało się, że Massimo jest ojcem Ridgea?","answers":[{"content":"podczas choroby Steffy, kiedy potrzebowała nerki","isCorrect":false},{"content":"podczas wyjazdu do Portofino","isCorrect":false},{"content":"podczas narodzin Ridge'a, jednak Stephanie trzymała to wszystko w tajemnicy","isCorrect":false},{"content":"podczas wypadku, gdy Ridge'potrzebował krwi","isCorrect":true}],"duration":30}// {"tags":["tv","tasiemiec","serial"],"tasks":[{"question":"Kiedy okazało się, że Massimo jest ojcem Ridgea?","answers":[{"content":"podczas choroby Steffy, kiedy potrzebowała nerki","isCorrect":false},{"content":"podczas wyjazdu do Portofino","isCorrect":false},{"content":"podczas narodzin Ridge'a, jednak Stephanie trzymała to wszystko w tajemnicy","isCorrect":false},{"content":"podczas wypadku, gdy Ridge'potrzebował krwi","isCorrect":true}],"duration":30},{"question":"Jak ma na imię brat Tylor?","answers":[{"content":"Jack","isCorrect":false},{"content":"Nick","isCorrect":false},{"content":"Oscar","isCorrect":false},{"content":"Zach","isCorrect":true}],"duration":30},{"question":"Kim była Carmen Arena?","answers":[{"content":"tancerką","isCorrect":false},{"content":"sprzątaczką","isCorrect":false},{"content":"kelnerką","isCorrect":true},{"content":"piosenkarką","isCorrect":false}],"duration":30},{"question":"Gdzie toczy się akacja serialu?","answers":[{"content":"w Nowym Jorku","isCorrect":false},{"content":"w Miami","isCorrect":false},{"content":"w Los Angeles","isCorrect":true},{"content":"w Londynie","isCorrect":false}],"duration":30},{"question":"Kto nie jest dzieckiem Brook?","answers":[{"content":"Bridget","isCorrect":false},{"content":"Ridge Junior","isCorrect":false},{"content":"Thomas","isCorrect":true},{"content":"Rick","isCorrect":false}],"duration":30}],"name":"Moda na sukces","description":"Quiz z najważniejszych wydarzeń serialu.","level":"średni","id":"62032610069ef9b2616c761e"},
            //currentTest: this.state.tests[this.numOfRiddle]
            tests: {},
            currentTest:{},
            isShowResult: false
        }
        Navigation = navigation
        this.Link = 'https://tgryl.pl/quiz/test/' + route.params.id
        console.log(this.Link,'\n','https://tgryl.pl/quiz/test/62032610069ef9b2616c761e')
        this.title = route.params.nameQuiz
        this.numOfRiddle = 0
        this.poitns = 0
        this.onPress = this.onPress.bind(this)
        this.sendResult = this.sendResult.bind(this)

    }
    async componentDidMount() {
        await fetch(this.Link).then(res => res.json())
        .then((response)=>{
            const data = response
            this.state.tests = data
            this.setState({tests: data})
            this.setState({currentTest: this.state.tests.tasks[this.numOfRiddle]})
        },
        (err) => {
            console.log(err)
        })

    }
    onPress(answer) {
        this.numOfRiddle += 1
        if (answer) {
            this.poitns += 1
        }
        if (this.numOfRiddle < this.state.tests.tasks.length) {
            this.state.tests.tasks[this.numOfRiddle].answers = _.shuffle(this.state.tests.tasks[this.numOfRiddle].answers)
            this.setState({ currentTest: this.state.tests.tasks[this.numOfRiddle] })
        } else {
            this.setState({ isShowResult: true })
        }
    }
    createBtn(ans) {
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

    createBtns() {
        return (
            <View style={styles.answersRow}>
                <FlatList
                    data={this.state.currentTest.answers}
                    extraData={this.state.currentTest.answers}
                    renderItem={({ item }) => (
                        this.createBtn(item)
                    )}
                />
            </View>
        )
    }

    createTxtView() {
        return (
            <View style={styles.questionRows}>
                <View style={styles.title}>
                    <Text style={styles.valueTxtTitle}>{this.title}</Text>
                </View>
                <View style={styles.questionValue}>
                    <Text style={styles.valueTxtQuestion}>
                        {this.state.currentTest.question}
                    </Text>
                </View>
            </View>
        )
    }
    showRiddles() {
        return (
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
    async sendResult() {
        await fetch('http://tgryl.pl/quiz/result',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                   "nick": Global.myName,
                   "score": this.poitns,
                   'total':  this.state.tests.tasks.length,
                   "type": this.state.tests.name
                }
            )    
        })
        .then(res => {
            Alert.alert('Powodzenie wysłania')
        }).then((response)=>{
            console.log('???',response)
        },
        (err) => {
            Alert.alert('Nie udało się wysłać')
        })
        Global.name=''
        this.goMain()
    }
    goMain() {
        Navigation.dispatch(CommonActions.reset({
            index: 2,
            routes: [
                {
                    name: 'Główny Ekran'
                }
            ]
        }))
    }
    testowe(val){
        Global.myName = val
    }
    showResult() {
        return (<View style={styles.container}>
            <View style={styles.resultStyleText}>
                <Text style={styles.fontStyle}>
                    {this.poitns}/{this.state.tests.tasks.length}
                </Text>
            </View>
            <View style={styles.resultStyleController}>
                <TextInput
                    style={styles.txtInput}
                    placeholder={'Podaj swój nick'}
                    onChangeText={(val) => this.testowe(val)}
                />
                <Button
                    title='Wyślij wynik'
                    onPress={this.sendResult.bind()}
                />
                <Button
                    title="Menu Główne"
                    onPress={this.goMain.bind()}
                />
            </View>
        </View>)
    }
    render() {
        return this.state.isShowResult? this.showResult() : this.showRiddles()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    question: {
        flex: 1
    },
    answers: {
        flex: 1,
    },
    questionRows: {
        flex: 1,
        flexDirection: 'column'
    },
    answersRow: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionValue: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    valueTxtQuestion: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    valueTxtTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    answersCol: {
        flex: 1,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    btnStyle: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'lightgrey',
        paddingVertical: 20
    },
    resultStyleText: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontStyle: {
        fontSize: 150,
        fontWeight: 'bold'
    },
    resultStyleController: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    txtInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 3
    }


})