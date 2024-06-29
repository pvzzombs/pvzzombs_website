function bf(array){
  array = array.split("");
  var memory = [0];
  var pointer = 0;
  var result = [];
  var blocks = [];
  var max = 4000000;
  var maxCounter = 1;

  var counter = 0;
  while(counter < array.length){
    if(maxCounter === max){
      break;
    }
  	if(array[counter] === ">"){
  		pointer += 1;
  		if(memory.length == pointer){
  			memory.push(0);
  		}
  		blocks.push({cmd : ">", mem : memory[pointer], pnt : pointer});
  		maxCounter++;
  	}else if(array[counter] === "<"){
  		pointer -= 1;
  		if(pointer < 0){
  			pointer = memory.length - 1;
  		}
  		blocks.push({cmd : "<", mem : memory[pointer], pnt : pointer});
      maxCounter++;
  	}else if(array[counter] === "+"){
  		memory[pointer] += 1;
  		if(memory[pointer] > 255){
  			memory[pointer] = 0;
  		}
  		blocks.push({cmd : "+", mem : memory[pointer], pnt : pointer});
      maxCounter++;
  	}else if(array[counter] === "-"){
  		memory[pointer] -= 1;
  		if(memory[pointer] < 0){
  			memory[pointer] = 255;
  		}
  		blocks.push({cmd : "-", mem : memory[pointer], pnt : pointer});
      maxCounter++;
  	}else if(array[counter] === "."){
    	result.push(String.fromCharCode(memory[pointer]));
    	blocks.push({cmd : ".", mem : memory[pointer], pnt : pointer, code : String.fromCharCode(memory[pointer])});
      maxCounter++;
  	}else if(array[counter] === ","){
  		var pending = prompt("Input Command Detected - Enter a character : ", "");
  		if(pending === ""){
  			memory[pointer] = 0;
  		}else{
  			pending = pending || "A";
    		memory[pointer] = parseInt(pending.charCodeAt(0));
    	}
    	blocks.push({cmd : ",", mem : memory[pointer], pnt : pointer});
      maxCounter++;
  	}else if(array[counter] === "["){
  		if(memory[pointer] === 0){
  			var open = 0;
  			counter += 1;
  			while(counter < array.length){
  				if(array[counter] === "]" && open === 0){
  					break;
  				}else if(array[counter] === "["){
  					open += 1;
  				}else if(array[counter] === "]"){
  					open -= 1;
  				}
  				counter += 1;
  			}
        maxCounter++;
  		}
  	}else if(array[counter] === "]"){
  		if(memory[pointer] > 0){
  			var close = 0;
  			counter -= 1;
  			while(counter >= 0){
  				if(array[counter] === "[" && close === 0){
  					break;
  				}else if(array[counter] === "]"){
  					close += 1;
  				}else if(array[counter] === "["){
  					close -= 1;
  				}
  				counter -= 1;
  			}
        maxCounter++;
  		}
  	}
  		counter += 1;
  }
  //console.log(blocks);
  return blocks;
}