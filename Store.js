import {isStr, isNumb, isObj} from "./utils.js"

import fileHandler from "./FileHandler.js"



function checkColumns(doc, types){
  let checkOut = true
   Object.keys(types).map((key, i)=> {
      if(!checkOut) return checkOut;
      if(doc[key] === undefined){
        console.log(key, "is missing in this document")
        checkOut = false
      }
   
   })
  
   if(Object.keys(types).length !== Object.keys(doc).length) checkOut = false
   
   return checkOut


}

function checkTypes(doc, types){
    let checkOut = true 

    Object.keys(doc).map((key,i)=> {
        if(!checkOut) return checkOut;
       if(types[key] === "String"){
           if(!isStr(doc[key])) checkOut = false
       }else if(types[key] === "Number"){
          if(!isNumb(doc[key])) checkOut = false 
       }else if(types[key] === "Object"){
          if(!isObj(doc[key])) checkOut = false
       }
    
    })


    return checkOut
}



export default class Store{
	#data = {}
	#meta = {
           length: 0,
		   
         
	}
	 constructor(name, options){
	  
         this.#meta.name = name;
		 this.#meta.options = options;
		 this.fileH = new fileHandler(name)


	  }
    
   get getData(){

    return this.#data
   }

	set setData(data){
			if(!checkColumns(data, this.#meta.options.types)){
					throw new Error(`db expected a document with these columns: ${Object.keys(this.#meta.options.types)},
														but got ${Object.keys(data)} for this document ${JSON.stringify(data)}`)
			}
			if(!checkTypes(data, this.#meta.options.types)){
			throw new Error(`db expected a document with these types: ${Object.values(this.#meta.options.types)},
														but got ${Object.values(data)} for this document ${JSON.stringify(data)}`)
			
			}
   
		data._id = this.#meta.length
		if(this.#meta.options && this.#meta.options.timeStamp && this.#meta.options.timeStamp){
           data.timeStamp = Date.now()

		}
		this.#data[this.#meta.length] = data
		this.#meta.length++
		// console.dir(this.fileH)
		;(async() => {this.fileH.write(`${data._id} :` + JSON.stringify(data) + "\n" )})()
		// console.log('data', this.#data)
	}
	
		get getTypes(){
		   return	this.#meta.options.types
		
		}
}



Store.prototype.allKeys = function(){
      // console.log(this.getData)
      return Object.keys(this.getData)

}


Store.prototype.getByid = function(id){
	const data = this.getData 
	console.log(data[id], 'vusa')
    if(data[id]){

     return data[id]
		}else{

          return "noDoc"
		}

}


Store.prototype.getAll = function(){

  return this.getData

}


Store.prototype.insert = function(data){
	this.setData  = data

       

}

Store.prototype.types = function(){
    return this.getTypes

}
