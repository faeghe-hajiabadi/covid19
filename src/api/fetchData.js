
async function fetchData(url) {
    console.log("this is fetch")
    const res = await fetch(url);
    return res.json()
      
  }

 export default fetchData; 