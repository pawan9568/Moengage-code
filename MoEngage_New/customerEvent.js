// let script = document.createElement('script');
// script.src ="https://cdn.moengage.com/webpush/moe_webSdk_moe_sdk.min.latest.js?app_id=E3GJQO2J0RCTKPXKQI3J5TGY_DEBUG&cluster=DC_3";
// document.head.appendChild(script);

let windowUrl = window.location.href; 

if(windowUrl.includes('checkouts')){
  // console.log(windowUrl,'windowUrl');
(function(i,s,o,g,r,a,m,n){i.moengage_object=r;t={};q=function(f){return function(){(i.moengage_q=i.moengage_q||[]).push({f:f,a:arguments})}};f=['track_event','add_user_attribute','add_first_name','add_last_name','add_email','add_mobile','add_user_name','add_gender','add_birthday','destroy_session','add_unique_user_id','moe_events','call_web_push','track','location_type_attribute'],h={onsite:["getData"]};for(var k in f){t[f[k]]=q(f[k])}a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);i.moe=i.moe||function(){n=arguments[0];return t};a.onload=function(){if(n){i[r]=moe(n)}}})(window,document,'script','https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js','Moengage')
      Moengage = moe({
        app_id:'E3GJQO2J0RCTKPXKQI3J5TGY_DEBUG',
        debug_logs: 1,
        cluster: 'DC_3',
        swPath: '/tools/moengage/sw.js',
        swScope: '/'
      });


const firstTimeUser = localStorage.getItem("firstTimeUser");
const orderCount = localStorage.getItem("orderCount")


  var currentURLcart = window.location.href;
     // console.log("sandhya colorName_cart",currentURLcart);
      var urlParamscart = new URLSearchParams(new URL(currentURLcart).search);
      var utm_parametercart=urlParamscart.get('utm_source');
          if (!utm_parametercart) {
            utm_parametercart = 'Shopify';
  }

analytics.subscribe('checkout_started', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;
  console.log('checkout_started',checkout)
  const cartUrl = event.context.document.location.href;

  let CartMrp = 0
  let productId = [];
  let productprice=[];
  let productquantity = [];
  let producttitle = [];
  let imageurl = []
  let producturl=[]
  let Vendorname =[]
  let CouponTitle = []
  let varientid=[]
  let productCategory = []
  let TotalDiscount = 0
  checkout.lineItems.forEach((lineItem)=>{
  varientid.push(lineItem.id);
  producttitle.push(lineItem.title);
  productprice.push(lineItem.variant.price.amount);
  productquantity.push(lineItem.quantity);
  productCategory.push(lineItem.variant.product.type)
  imageurl.push(lineItem.variant.image.src)
    let produrl =`https://www.a-squad.in${lineItem.variant.product.url}`
  producturl.push(produrl)
  Vendorname.push(lineItem.variant.product.vendor)
  productId.push(lineItem.variant.product.id)
  CartMrp= CartMrp+lineItem.variant.price.amount
  lineItem.discountAllocations.forEach((item)=>{
    TotalDiscount += item.amount.amount;
  });
  })

checkout.discountApplications.forEach((item)=>{
CouponTitle.push(item.title)
})

  let phone = checkout.phone
  if(phone == "undefined")
  {
    phone=""
  }
  Moengage.track_event("Checkout_Started", {
    "Currency":checkout.currencyCode,
    "First Time User":firstTimeUser,
    "Status":true,
    "Cart URL":cartUrl,
    "Mobile Number":phone,
    "Product ID":productId,
    "Product Price":productprice,
    "Product Quantity":productquantity,
    "Product Title":producttitle,
    "Product Category":productCategory,
    "Total Discount":TotalDiscount,
    "Product URL":producturl,
    "Image URL":imageurl,
    "Vendor name":Vendorname,
    "Total Quantity":checkout.lineItems.length,
    "Total Items":checkout.lineItems.length,
    "Total MRP":CartMrp,
    "Total Price":checkout.totalPrice.amount,
    "Variant ID":varientid,
    "Source":utm_parametercart,
    "Touchpoint":"Checkout page",
     "Coupon Name":CouponTitle,
   
});
  
});
  // let checkBox = document.querySelector("#save_shipping_information");
  // console.log(document.body,'checkbox')
analytics.subscribe('checkout_address_info_submitted', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;
    // console.log(event,'event')
  console.log("checkout_address_info_submitted",checkout);
  
  const cartUrl = event.context.document.location.href;
  let productId = [];
  let productprice=[];
  let productquantity = [];
  let producttitle = [];
  let imageurl = []
  let producturl=[]
  let Vendorname =[]
  let varientid=[]
  let CartMrp = 0
  let productCategory = []
  let CouponTitle = []
  let TotalDiscount = 0
  
  checkout.lineItems.forEach((lineItem)=>{
  varientid.push(lineItem.id);
  producttitle.push(lineItem.title);
  productprice.push(lineItem.variant.price.amount);
  productquantity.push(lineItem.quantity);
  imageurl.push(lineItem.variant.image.src)
   let produrl =`https://www.a-squad.in${lineItem.variant.product.url}`
  producturl.push(produrl)
  productCategory.push(lineItem.variant.product.type)
  Vendorname.push(lineItem.variant.product.vendor)
  productId.push(lineItem.variant.product.id)
  CartMrp= CartMrp+lineItem.variant.price.amount
  lineItem.discountAllocations.forEach((item)=>{
    TotalDiscount += item.amount.amount;
  });
  })

  
  
  checkout.discountApplications.forEach((item)=>{
    CouponTitle.push(item.title)
  })
  Moengage.track_event("Checkout_Updated", {
    "Email":checkout.email,
    "Status":true,
    "First Time User":firstTimeUser,
    "Cart URL":cartUrl,
    "Customer ID":checkout.shippingAddress.phone,
    "FirstName":checkout.shippingAddress.firstName,
    "LastName":checkout.shippingAddress.lastName,
    "Mobile Number":checkout.shippingAddress.phone,
    "Currency":checkout.currencyCode,
    "Product ID":productId,
    "Product Price":productprice,
    "Product Quantity":productquantity,
    "Product Title":producttitle,
    "Product Category":productCategory,
    "Product URL":producturl,
    "Image URL":imageurl,
    "Total Discount":TotalDiscount,
    "Vendor name":Vendorname,
    "Total Quantity":checkout.lineItems.length,
    "Total Items":checkout.lineItems.length,
    "Total MRP":CartMrp,
    "Total Price":checkout.totalPrice.amount,
    "Variant ID":varientid,
    "Source":utm_parametercart,
    "Touchpoint":"Checkout page",
    "Coupon Name":CouponTitle
   
});
    Moengage.add_user_attribute("email", checkout.email);
    Moengage.add_first_name(checkout.shippingAddress.firstName);
    Moengage.add_last_name(checkout.shippingAddress.lastName);
    Moengage.add_mobile(checkout.shippingAddress.phone);
    Moengage.add_unique_user_id(checkout.shippingAddress.phone);
});
// analytics.subscribe('checkout_shipping_info_submitted', (event) => {
//   // Example for accessing event data
//   const checkout = event.data.checkout;
//   console.log("checkout_shipping_info_submitted",checkout);
//   // const checkoutTotalPrice = checkout.totalPrice.amount;
//   // const firstItem = checkout.lineItems[0];
//   // const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;
//   Moengage.track_event("begin_checkout", {
//   });
// });
analytics.subscribe('checkout_completed', (event) => {
  console.log("eventeventevent" ,event)
  const checkout = event.data.checkout;
  console.log("Order_Created",checkout);
  var date = new Date().toLocaleString();
  let productId = [];
  let productprice=[];
  let productquantity = [];
  let producttitle = [];
  let imageurl = []
  let producturl=[]
  let Vendorname =[]
  let varientid=[]
  let productCategory = []
  checkout.lineItems.forEach((lineItem)=>{
  varientid.push(lineItem.variant.id);
  producttitle.push(lineItem.title);
  productprice.push(lineItem.variant.price.amount);
  productquantity.push(lineItem.quantity);
  imageurl.push(lineItem.variant.image.src)
  let produrl =`https://www.a-squad.in${lineItem.variant.product.url}`
  producturl.push(produrl)
  Vendorname.push(lineItem.variant.product.vendor)
  productId.push(lineItem.variant.product.id)
  productCategory.push(lineItem.variant.product.type)
  })
  let paymentMode = checkout.transactions[0].gateway;
  if(paymentMode.match(/COD/)!=null){
    paymentMode="Pending";
  }
  else{
     paymentMode="Paid";
  }
  Moengage.track_event("Order_Created", {
    "Email":checkout.email,
    "FirstName":checkout.shippingAddress.firstName,
    "LastName":checkout.shippingAddress.lastName,
    "First Time User":firstTimeUser,
    "Mobile Number":checkout.shippingAddress.phone,
    "Currency":checkout.currencyCode,
    "Order ID":checkout.order.id,
    "Product ID":productId,
    "Product Price":productprice,
    "Product Quantity":productquantity,
    "Product Title":producttitle,
    "Product Category":productCategory,
    "Product URL":producturl,
    "Image URL":imageurl,
    "No. of order":orderCount+1,
    "Variant ID":varientid,
    "Vendor name":Vendorname,
    "Total Quantity":checkout.lineItems.length,
    "Total Items":checkout.lineItems.length,
    "Total Price":checkout.totalPrice.amount,
    "Order Date":date,
    "Source":utm_parametercart,
    "Payment Mode":checkout.transactions[0].gateway,
    "Payment Status":paymentMode
   
   
});
   Moengage.track_event("Item_Purchased", {
    "Currency":checkout.currencyCode,
    "Order ID":checkout.order.id,
    "First Time User":firstTimeUser,
    "Product ID":productId,
    "Product Price":productprice,
    "Product Title":producttitle,
    "Product Category":productCategory,
    "Product URL":producturl,
    "Image URL":imageurl,
    "Variant ID":varientid,
    "Vendor name":Vendorname,
    "Total Quantity":checkout.lineItems.length,
    "Order Date":date,
    "Source":utm_parametercart,   
});
   
});

}
