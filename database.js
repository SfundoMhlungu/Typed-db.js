
import {insert, update, delete_} from './operators.js'
import Store from "./Store.js"
import select from "./select.js"
import {types} from "./utils.js"

function db(name,options) {
// new 
  if(!options.types){
     throw new Error("typed-db needs a types option to work")
  
  }
  // just checking if the types are supported
 const n = Object.keys(options.types).map((val, i)=> {
 
      return types[options.types[val]]
  
  })

  if(n.indexOf(undefined) !== -1){
     
     const m = Object.keys(options.types)[n.indexOf(undefined) ]
     console.log(m, "logging m")
     throw new Error(`type of ${options.types[m]} for column ${m} does not exist`)
  }
  // end new
  // options.types = n
  // console.log(options)
    
	this.store = new Store(name, options)

   

}



db.prototype.insert = insert
db.prototype.update = update
db.prototype.select = select
db.prototype.delete_ = delete_


export default db 







