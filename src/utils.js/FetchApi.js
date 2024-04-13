// const dataHandler = async(url)=>{
//   try {
//     const response = await fetch(url);
//     const data = await response.json(); // Parse response body as JSON
//     return data;
 

//   } catch (error) {
//     console.log(error);
//   }
// }
// async function fetchData() {
//   const d = await dataHandler('http://localhost:8080/questions');
//   console.log(d);
// }
// fetchData()

const dataHandle = (fn)=>async(url)=>{
  try {
    const result = await fn(url)
    return result
  } catch (error) {
    
  }
}
dataHandle('http://localhost:8080/questions')