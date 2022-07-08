
export const types = {
     "String": 1, 
     "Number": 2,
     "Object": 3,


}




// absolete
export function isInDb(store, id){



   return store[id] !== undefined ? true : false



}


export const isStr = (val) => typeof val === "string"
export const isNumb = (val) => typeof val === "number"
export const isObj = (val) => typeof val === "object"

// npm publish --access public
