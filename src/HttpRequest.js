export default class HttpRequest{
    static async getHttp(link){
        console.log(link)
        fetch(link,{method: 'GET'}).then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
            (err)=>{
                console.log(err)
            })
    }
}