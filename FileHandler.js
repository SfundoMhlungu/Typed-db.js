import {createWriteStream, createReadStream} from "fs"



export default class fileHandler{

 	constructor(fileName){
		console.log('create a writable', fileName)
  		this.fileName = fileName
		this.dest = createWriteStream(fileName + ".db")
		this.readable = createReadStream(fileName + ".db")
	}


     write(data){
            
		this.dest.write(data)


	 }

	read(){
		setTimeout(()=> {

			this.readable.on('data', (d) => {console.log(d)})
			


			}, 10000)

       
	}

}







