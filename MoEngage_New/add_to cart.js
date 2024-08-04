const getProductInfo = async(productTitle)=>{
    const res = await fetch(window.Shopify.routes.root + `products/{{ product.handle }}.js`);
    const data = await res.json();
    return data;
  }


 
// Equivalent event setup using the `.on()` method
$( ".product-form__submit" ).on( "click", async function() {
  const productInfo = await getProductInfo('7 Shakra Bracelet');
  let {  
    id,
    title,
    vendor,
    url,
} = productInfo;
  console.log(id,title,vendor,url)
});