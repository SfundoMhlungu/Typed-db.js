import db from './index.js'
import {types} from "./utils.js"


let store = new db("test db", {timeStamp: true, 
                   types: {name:"String", surname:"String", age:"Number"}}
                  )



// console.log(store)

store.insert({name: "sk", surname: "mhlungu", age: 23})
store.insert({name: "np", surname: "mhlungu", age: 19})
store.insert({name: "jane", surname: "doe", age: 0})
// console.log(store)

// console.log("select",store.select().canYou())


const c = store.select()
// let d = store.select(10)
// console.log("d", d)
c.beginQuery("THIS IS CHANNEL C")
// c.Where('name === sk')
// c.Where('surname === mhlungu')
c.Where('age < 23')


const d = store.select()

d.beginQuery("THIS IS CHANNEL D")
d.Where('age === 0')

console.log('===============================================')
console.log(d.endQuery(), 'D RESULT age> 10')
console.log('===============================================')
console.log(c.endQuery(), "C RESULT age <  23")
console.log('===============================================')
c.close()
d.close()


