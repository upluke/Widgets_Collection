class DefaultMap extends Map{
    constructor(defaultValue){
      // invoke superclass onstructor remember the dfault value
      super()
      this.defaultValue=defaultValue
    }
    get(key){
      // if the key is already in the map return its value from superclass
      if (this.has(key)){
        return super.get(key)
      }else{
        return this.defaultValue
      }
    }
  }
  
  class Histogram{
    constructor(){
      this.letterCounts=new DefaultMap(0)
      this.totalLetters=0
    }
  
    add(text){
      // remove whitespace from the text, and convert to upper case
      text=text.replace(/\s/g,"").toUpperCase()
      for(let character of text){
      let count =this.letterCounts.get(character) // get old count
      this.letterCounts.set(character, count+1) // increment it
      this.totalLetters++
      }
    }
  
  // convert the histogram to a string that displays an ASCII graphic
    toString(){
    // convert the map to an array of [key, value] arrays
    let entries=[...this.letterCounts]
  
    // sort the array by count, then alphabetically
    entries.sort((a,b)=>{
      if(a[1]===b[1]){
        return a[0]<b[0]? -1:1
      }else{
        return b[1]-a[1]
      }
    })
  
    // contert the counts to percentages
    for(let entry of entries){
      entry[1]=entry[1]/ this.totalLetters*100
    }
  
    // drop any entries less than 1%
    entries=entries.filter(entry=>entry[1]>=1)
  
    // now convert each entry to a line of text
    let lines=entries.map(
      ([l,n])=>`s{l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
    )
  
    // and return the concatenated lines, seperated by newline characters
    return lines.join("\n")
    }
  
  }// end of class
  
  // This async (Promise-returning) function creates a Histogram object, 
  // asynchronously reads chunks of text from standard input, and adds those chunks to
  //the histogram. When it reaches the end of stream, it returns this histogram
  async function histogramFromStdin(){
    process.stdin.setEncoding("utf-8") // Read Unicode strings, not bytes
    let histogram=new Histogram()
    for await (let chunk of process.stdin){
      histogram.add(chunk)
    }
    return histogram
  }