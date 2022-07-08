
const tracker = {
     id: 0,
     


}





const comparers = {
  "eq": (a, b) => a === b,
   "gt": (a, b) => a > b,
	"ls": (a, b) => a < b
 

}


const mapSearch = function(direct, a, b){
      // console.log(direct, a, b, "MapSearchg")
      

	if(direct === "eq"){
            
           return comparers['eq'](a, b)
		 }else if(direct === "gt"){

              return comparers['gt'](a, b)

			}else if(direct === "ls"){
            return comparers['ls'](a, b)


				}else{

                         console.log('Not handled')
				}


}

const search = function(comm, data, types){
// console.log(types)
	 let split = comm.split(" ")
	 // WHAT COLUMN DOES NOT EXIST fails silentlt
	 if(types[split[0]] === 'Number'){
	 
	    split[2] = +split[2]
	 }
	// console.log("splitted",split)
	let filtered = []
	
     if(split[1] === "===" || split[1] === "=="){
            
		    data.map((obj, i)=> {
			 if(mapSearch('eq' , obj[split[0]], split[2])){

                   filtered.push(obj)
			 }
                   
		}) 
        
		 }else if(split[1] === "<"){
             data.map((obj, i)=> {
			 if(mapSearch('ls' , obj[split[0]], split[2])){

                   filtered.push(obj)
			 }
                   
		})     

			 }else if(split[1] === ">"){


                data.map((obj, i)=> {
			 if(mapSearch('gt' , obj[split[0]], split[2])){

                   filtered.push(obj)
			 }
                   
		}) 
				}

   return filtered
}





function functionalObj(store){
          this.id = NaN;
  
          this.beginQuery = (channelName = "") => {	
				   // prepare
				   console.log("creating channel", channelName)
				     if(tracker[this.id] && tracker[this.id].beganQ){
									console.warn('please close the previous query');
									return 
					  }
                     // keys = this.store.allKeys()
              this.id = tracker.id
               tracker[this.id] = {
              filtered: [],
              types: {},
              beganQ: false,
              cName : channelName === "" ? this.id : channelName 
             }
                      
            tracker.id++
                    
				    tracker[this.id].filtered = Object.values(store.getAll())
				    tracker[this.id].types = store.types()
				    tracker[this.id].beganQ = true
				    console.log('opening channel: ', tracker[this.id].cName)
				    // console.log('tracker obj', tracker)
                     
				   };
				   
				   
		        this.Where = (str) => {
              if(!tracker[this.id] || tracker[this.id] && !tracker[this.id].beganQ){
                          console.log('begin query to filter')
						  return
						}
					   // console.log(str)
					let f = search(str, tracker[this.id].filtered, tracker[this.id].types)
					// console.log(f, "f")
					if(f.length > 0){
						// filtered.push(f)
						tracker[this.id].filtered = f
				  	}
					};
					
					 this.endQuery = () => {
				  // end and remove stuff
			    if(!tracker[this.id] || tracker[this.id] && !tracker[this.id].beganQ){
					        console.warn('no query to close')
					       return
					}
				        
				  // console.log(keys)
				           
                   return {data:tracker[this.id].filtered, channel: tracker[this.id].cName}     
				};
				
					this.close = ()=> {
				
				    if(tracker[this.id] && !tracker[this.id].closed){
				          Reflect.deleteProperty(tracker, this.id)
				          // console.log('cleaned up', tracker)
				    
				    }
				
				
				}

}


export default function select(option = "*"){
        if(Number(option) !== NaN && option !== "*"){
              

             return this.store.getByid(+option)
		}     


   
		   // store : this.store
	return  new functionalObj(this.store)


}
