async function printShopToJSON(){
  const response = await fetch("http://127.0.0.1:3000/shopStock");
  if(!response.ok) throw new Error("error in queryJoke!");
  const jsonData = await response.json();
  console.log(jsonData);
  return response;
}
ret = printShopToJSON();