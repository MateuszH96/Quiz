import AsyncStorage from "@react-native-async-storage/async-storage"
export default class AsyncStorageOperate {
    static saveData = async (key,value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (err) {
            console.log(err)
        }
    }
    static getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            console.log(value)
            return value
        } catch (err) {
            console.log(err)
        }
    }
}