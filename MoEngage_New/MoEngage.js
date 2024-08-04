<script>
$(document).ready(function(){  
  var vendorName = "AcneSquad";
  var brandName = "AcneSquad";
  var orderCount = '{{ customer.orders_count | json  }}'
  localStorage.setItem("orderCount",orderCount);

  if(orderCount == null){
  localStorage.setItem("orderCount",0);
  }
  if(orderCount > 0){
  localStorage.setItem("firstTimeUser",false);
  }
  else{
  localStorage.setItem("firstTimeUser",true); 
  }


  var currentURLcart = window.location.href;
     // console.log("sandhya colorName_cart",currentURLcart);
      var urlParamscart = new URLSearchParams(new URL(currentURLcart).search);
      var utm_parametercart=urlParamscart.get('utm_source');
          if (!utm_parametercart) {
            utm_parametercart = 'Shopify';
         }

  
   // --------------------------------------------------register-------------------------------------
     {% if template contains 'register' %}
   $('body').on('click', '#create_customer .btn', function(){
     
     var isCheckboxChecked = $('#checkbox-1').prop('checked');
          let registerForm = document?.querySelector('#create_customer');
          let firstName = registerForm?.querySelector('#first_name').value;
          let lastName = registerForm?.querySelector('#last_name').value;
          let email = registerForm?.querySelector('#email').value;
          Moengage.track_event("User_Registered", {
            "Email": email,
            "Customer ID" : "",
            "Mobile Number":"",
            "Touchpoint":"Signup page",
            "FirstName":firstName,
            "LastName":lastName,
            "Source": utm_parametercart,
            "Promotional Consent":isCheckboxChecked,
            "Status": true,
            "First Time User": true
          });

     if(isCheckboxChecked){
       	Moengage.add_user_attribute("moe_subscribe", true);
     }else{
       	Moengage.add_user_attribute("moe_subscribe", false);
     }
            Moengage.add_first_name(firstName);
          	Moengage.add_last_name(lastName);
          	Moengage.add_email(email);
          	Moengage.add_mobile("");
            Moengage.add_unique_user_id("");
        });
        {% endif %}


     // ------------------------BEGIN-CHECKOUT----------------------
    const cartCheckOutBtn = document?.querySelector(".cart__checkout");
    if(cartCheckOutBtn){
        cartCheckOutBtn.addEventListener("click",()=>{
      var productId = [];
        var productName = [];
        var productCategory = [];
        var productPrice = [];
        var variantId = [];
        var productQuantity = [];
        var total_item_price = [];
        var date = new Date().toLocaleString();
        var order_summary_payment_method = [];
        $.getJSON('/cart', function(cartItem){
          var cart_total = cartItem.total_price/100;
          let TotalItem =0;
          cartItem.items.forEach(function(item){
            TotalItem=TotalItem+item.quantity
            var comparisonPrice = item.final_line_price/100;
            var totalItemPrice = item.line_price/100;
            var prodcutName = item.product_title;
            var prodcutPrice = item.price/100;
            var prodcutID = item.product_id;
            var variantID = item.id;
            var prodcutType = item.product_type;
            var prodcutQty = item.quantity;
            productId.push(prodcutID);
            productName.push(prodcutName);
            productCategory.push(prodcutType);
            productPrice.push(prodcutPrice);
            variantId.push(variantID);
            productQuantity.push(prodcutQty);
            total_item_price.push(totalItemPrice);
          });
          Moengage.track_event("Checkout_Started", {
            "Mobile Number":"",
            "Category":productCategory,
            "Product Name":productName,
            "Product ID": productId,
            "Variant ID": variantId,
            "Product Price": productPrice,
            "Product Quantity": productQuantity,
            "Total Price":total_item_price,
            "Total MRP":cart_total,
            "Total Quantity":TotalItem,
            "Currency":"INR",
            "Vendor Name":vendorName,
            "Source": utm_parametercart,
            "Status": true,
          
           
          });
        });
      })
    }

   // -----------------------------REMOVE FROM CART ICON----------------------
      $('body').on('click', '.cart-dropdown__items .cart-item__remove', function(){
             let productType =  $(this).attr('product_type')
           let totalQty = $(this).attr("product_qty");
        let productID =  $(this).attr('product_id')
        let productImg =  $(this).attr('product_image');
        productImg = `https://www.a-squad.in/cdn/shop/${productImg}`;
        let variantID =  $(this).attr('variant_id')
        let productTitle =  $(this).attr('product_title')
        // let productVendor =  $(this).attr('product_vendor')
        let productPrice =  $(this).attr('product_price')
        let discount = $(this).attr('discount')
        let productMRP = $(this).attr('product_MRP');
        let productUrl = "https://www.a-squad.in/" + $(this).attr('product_url');
        let currency = "INR"
        productPrice = productPrice.replace("₹","").trim()
         Moengage.track_event("Remove_From_Cart", {
        "Product ID": productID,
        "Variant ID": variantID,
        "Product Title":productTitle,
        "Vendor name":vendorName,
           "Product Category":productType,
        "Product Price":productPrice,
         "Total Quantity":totalQty,
        "Image URL":productImg,
        "Discount Amount":discount,
        "Product URL":productUrl,
        "MRP":productMRP,
        "Currency":currency,
        "Source": utm_parametercart,
       
        });
      })
      

  // -----------------------------REMOVE FROM CART MINUS----------------------
      $('body').on('click', '.cart__quantity .cart__quantity-minus', function(){
        let productType =  $(this).attr('product_type')
        let productID =  $(this).attr('product_id')
        let productImg =  $(this).attr('product_image');
        productImg = `https://www.a-squad.in/cdn/shop/${productImg}`;
        let variantID =  $(this).attr('variant_id')
        let productTitle =  $(this).attr('product_title')
        // let productVendor =  $(this).attr('product_vendor')
        let productPrice =  $(this).attr('product_price')
        let discount = $(this).attr('discount')
        let productMRP = $(this).attr('product_MRP')
        let currency = "INR"
        let source = "Shopify"
        let productUrl = "https://www.a-squad.in/" + $(this).attr('product_url');
        productPrice = productPrice.replace("₹","").trim()
         Moengage.track_event("Remove_From_Cart", {
        "Product ID": productID,
        "Variant ID": variantID,
               "Product Category":productType,
           "Total Quantity":1,
        "Product Title":productTitle,
        "Vendor name":vendorName,
        "Product Price":productPrice,
        "Discount Amount":discount,
        "Product URL":productUrl,
           "Image URL":productImg,
        "MRP":productMRP,
        "Currency":currency,
        "Source": utm_parametercart,
    
        });
      })

  //---------------------------------BANNER CLICK--------------------------------------
  let bannerConatainer = document?.querySelector('.homepage-slideshow');
  let itemId = bannerConatainer?.querySelector(".slideshow__slide ").getAttribute("data-slide-index");
  let banner = bannerConatainer?.querySelector('.image-overlay');
  if(banner){
    const href  = bannerConatainer?.querySelector("a").href;

    banner.addEventListener('click',()=>{
       Moengage.track_event("HP_Banner_Clicked", {
          "banner_name" : "Home page banner clicked",
         "URL":href,
         "item_id":itemId,
        })
    })
  }
  
  // ------------------------------------------ Category clicked-----------------------------------
      $('body').on('click', '.navmenu_h .navtext_second', function(){
       const text = $(this).text().trim();
       const href = $(this).find("a").attr("href");

    Moengage.track_event("Category_Navbar_Clicked", {
         "Category Name":text,
          "URL":href
        });
     })


    // ------------------------------------------ Category viewed-----------------------------------
  {% if template contains "collection" %}
  var productIdArr = [];
  var variantIdArr = [];
  {% for product in collection.products %}
    productIdArr.push('{{ product.id }}');   
    {% for variant in product.variants %}
      variantIdArr.push('{{ variant.id }}');
    {% endfor %}
  {% endfor %}
    setTimeout(function(){
             Moengage.track_event("Category_Viewed", {
              "Category Name":'{{ collection.title }}',
              "Item Count":productIdArr.length,
              "URL":'{{ collection.url }}',
              "Source": utm_parametercart,
              "Product ID":productIdArr,
              "Variant ID":variantIdArr  
                });
               },2000)
     
  {% endif %}



  // -------------------------BRIDAL-QUIZ-EVENTS-------------------
      const windowUrl = window.location.href;
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      if(window.location.href === "https://www.a-squad.in/pages/quiz-acne"){
          setTimeout(() => {
          Moengage.track_event("ASQ_Quiz_Started",{
            "Quiz Started":true
          });
      }, "1000");
  }
        if(window.location.href === "https://www.a-squad.in/pages/uv-squad-quiz"){
          setTimeout(() => {
          Moengage.track_event("UVSQ_Quiz_Started",{
            "Quiz Started":true
          });
      }, "1000");
  }
        $('body').on('click', '.quizeintonxtback .QuizstartBtn', function () {
          var QuizUserName = $(".quizname").val();
          var firstName = QuizUserName.split(" ")[0];
          var lastName = QuizUserName.split(" ")[1];
          let QuizUserPhone = $(".quizphone").val();
            if (window.location.href === "https://www.a-squad.in/pages/acne-quiz-login") {
                let eventData = {}
                let headingArr = [];
                let contentArr = [];
                for (let i = 1; i <= 4; i++) {
                    let tipHeading = localStorage.getItem(`tipHeading_` + i);
                    let tipContent = localStorage.getItem(`tipContent_` + i);
                    headingArr.push(tipHeading);
                    contentArr.push(tipContent);
                }


                 {% if customer %}
                    Moengage.track_event("ASQ_Quiz_Submitted", {
                        [headingArr[0]]: contentArr[0],
                        [headingArr[1]]: contentArr[1],
                        [headingArr[2]]: contentArr[2],
                        [headingArr[3]]: contentArr[3],
                        "Customer ID": QuizUserPhone,
                        "Email": '{{ customer.email }}',
                        "FirstName": firstName,
                        "LastName": lastName,
                        "Mobile Number": QuizUserPhone,
                        "First Time User": orderCount > 0 ? false : true,
                        "Source": utm_parametercart,
                        "Touch Point": "Quiz Submit page",
                        // "Vendor Name": vendorName
                    });
              
                {% else %}
                    Moengage.track_event("ASQ_Quiz_Submitted", {
                        [headingArr[0]]: contentArr[0],
                        [headingArr[1]]: contentArr[1],
                        [headingArr[2]]: contentArr[2],
                        [headingArr[3]]: contentArr[3],
                        "Customer ID": QuizUserPhone,
                        "Email": '{{ customer.email }}',
                        "FirstName": firstName,
                        "LastName": lastName,
                        "Mobile Number": QuizUserPhone,
                        "First Time User": orderCount > 0 ? false : true,
                        "Source": utm_parametercart,
                        "Touch Point": "Quiz Submit page",
                        // "Vendor Name": vendorName
                    });
                    Moengage.add_first_name(QuizUserName);
              {% endif %}
                Moengage.add_mobile(QuizUserPhone);
                Moengage.add_unique_user_id(QuizUserPhone);
            }
            if (window.location.href === "https://www.a-squad.in/pages/uv-quiz-login") {
                let questArr = [];
                let ansArr = [];
                let resObj = {};
                let question1 = localStorage.getItem("NewQuizQue1");
                let question2 = localStorage.getItem("NewQuizQue2");
                let question3 = localStorage.getItem("NewQuizQue3");
                let question4 = localStorage.getItem("NewQuizQue4");


                let ans1 = localStorage.getItem("NewQuizAns1");
                let ans2 = localStorage.getItem("NewQuizAns2");
                let ans3 = localStorage.getItem("NewQuizAns3");
                let ans4 = localStorage.getItem("NewQuizAns4");
                
               {% if customer %}
                var eventPayload = {
                      [question1]: ans1,
                      [question2]: ans2,
                        "Customer ID": QuizUserPhone,
                        "Email": '{{ customer.email }}',
                        "FirstName": firstName,
                        "LastName": lastName,
                        "Mobile Number": QuizUserPhone,
                        "First Time User": orderCount > 0 ? false : true,
                        "Source": utm_parametercart,
                        "Touch Point": "Quiz Submit page",
                        // "Vendor Name": vendorName
                    };

                  if(question3 !== null){
                  eventPayload[question3] = ans3;
                  }
                  if(question4 !== null){
                  eventPayload[question4] = ans4;
                  }
                 
                Moengage.track_event("UVSQ_Quiz_Submitted", eventPayload );            
              {% else %}

                var eventPayload = {
                  [question1]: ans1,
                  [question2]: ans2,
                  "Customer ID": QuizUserPhone,
                  "Email": '{{ customer.email }}',
                  "FirstName": firstName,
                  "LastName": lastName,
                  "Mobile Number": QuizUserPhone,
                  "First Time User": orderCount > 0 ? false : true,
                  "Source": utm_parametercart,
                  "Touch Point": "Quiz Submit page",
              };

              if(question3 !== null){
                eventPayload[question3] = ans3;
              }
               if(question4 !== null){
                eventPayload[question4] = ans4;
              }
                 
                 Moengage.track_event("UVSQ_Quiz_Submitted", eventPayload);
               Moengage.add_first_name(QuizUserName);
                {% endif %}
                Moengage.add_mobile(QuizUserPhone);
                Moengage.add_unique_user_id(QuizUserPhone);
            }

        });


    // --------------------------------------------------logout-------------------------------------
      let logOut = document?.querySelector('#MainContent .user_logout');
    // let firstTimeUser = false;
    // if( orderCount== 0){
    //   firstTimeUser = true
    // }
      if(logOut){
         $('#MainContent .user_logout').click(function(){    
          Moengage.track_event("Logged_Out", {
            "Customer ID": '',
            "Mobile Number":"",
            "Email": '{{ customer.email }}',
            "FirstName": '{{ customer.first_name }}',
            "First Time User":orderCount > 0 ? false : true,
            "LastName": '{{ customer.last_name }}',
            "Source": utm_parametercart
          });
           localStorage.setItem("isLoggedIn", false);
      })
    }


    // --------------------------------------------------login-------------------------------------
  var isLoggedIn =  localStorage.getItem("isLoggedIn");
  if(!isLoggedIn){
    localStorage.setItem("isLoggedIn", false);
  }
  if(window.location.href === "https://www.a-squad.in/account" && isLoggedIn == "false"){
    
        setTimeout(()=>{   
          Moengage.track_event("Logged_In", {
           "Email": '{{ customer.email }}', 
            "Mobile Number":"",
            "CustomerID":"",
            "FirstName":'{{ customer.first_name }}',
            "LastName":'{{ customer.last_name }}',
            "First Time User":orderCount > 0 ? false : true,
            "Source": utm_parametercart
          });
    },2000)
    localStorage.setItem("isLoggedIn", true);
  }
  




  
     // -------------------------------ADD-TO-CART on PRODUCT-PAGE--------------------------
        {% if template contains 'product' %}
          $(".product-form .btn").click(function(){
          let imgUrl = $(".product__page").find("img");
          imgUrl = imgUrl[0].getAttribute("data-src")

          let qtyValue = document.querySelector(".quantity__input").value;
        
        Moengage.track_event("Add_To_Cart", {
        "Product ID": '{{ product.id }}',
        "Vairant ID": "{{product.selected_or_first_available_variant.id}}",
        "Product Title":'{{ product.title }}',
        "Product URL":"https://www.a-squad.in{{ product.url }}",
        "Image URL":imgUrl,
        "Total Quantity":qtyValue,
        "Vendor Name":vendorName,
        "Product Category":'{{ product.type }}',
        "Product Price":'{{product.price}}'/100,
        "Discount Amount":"{{ product.compare_at_price | minus: product.price }}"/100,
        "MRP":"{{ product.compare_at_price_max }}"/100,
        "Currency": "INR",
        "Source": utm_parametercart,
      
        });
        });
      {% endif %}

    // --------------------ADD-TO-CART on HOME-PAGE------------------------
  
    const homeAddToCart = document?.querySelector(".quick-add-button");
    const homeDeskTopCartBtn = document?.querySelector(".proDctPricCartBtn")

    if(homeDeskTopCartBtn){
      $(".proDctPricCartBtn").click(function(e){
        let imgUrl = $(this).parent()[0];
        imgUrl = imgUrl.querySelector('.product-item__bg').getAttribute("data-bgset").split(" ")[0];
        let productID =  $(this).attr('product_id')
        let variantID =  $(this).attr('variant_id')
        let productTitle =  $(this).attr('product_title')
        let productPrice =  $(this).attr('product_price')
        let discount = $(this).attr('discount')
        let productType = $(this).attr('product_type')
        let productMRP = $(this).attr('product_MRP')
        let currency = "INR"
        let productUrl = $(this).attr('product_url');
        productPrice = productPrice.replace("₹","").trim()
        productUrl = `https://www.a-squad.in/${productUrl}`
        Moengage.track_event("Add_To_Cart", {
        "Product ID": productID,
        "Variant ID": variantID,
        "Product Title":productTitle,
        "Total Quantity":1,
        "Vendor Name":vendorName,
        "Product Price":productPrice,
        "Discount Amount":discount,
        "Product Category":productType,
        "Product URL":productUrl,
        "Image URL":imgUrl,
        "MRP":productMRP,
        "Currency":currency,
        "Source": utm_parametercart,
    
        });
    })
  }

    if(homeAddToCart){
        $(".quick-add-button").click(function(){
           let imgUrl = $(this).parent().parent().parent()[0];
        imgUrl = imgUrl.querySelector('.product-item__bg').getAttribute("data-bgset").split(" ")[0];

      let productID =  $(this).attr('product_id')
        let variantID =  $(this).attr('variant_id')
        let productTitle =  $(this).attr('product_title')
        let productPrice =  $(this).attr('product_price')
        let discount = $(this).attr('discount')
        let productType = $(this).attr('product_type')
        let productMRP = $(this).attr('product_MRP')
        let currency = "INR"
        let source = "Web/Limechat/Affiliates"
        productPrice = productPrice.replace("₹","").trim()
          let productUrl = $(this).attr('product_url');
          productUrl = `https://www.a-squad.in/${productUrl}`
         Moengage.track_event("Add_To_Cart", {
        "Product ID": productID,
        "Variant ID": variantID,
        "Product Title":productTitle,
        "Vendor Name":vendorName,
        "Product Price":productPrice,
        "Discount Amount":discount,
        "Product Category":productType,
        "Product URL":productUrl,
        "Image URL":imgUrl,
        "MRP":productMRP,
        "Currency":currency,
        "Source": utm_parametercart,
 
        });
        });
    }

    // --------------------------------- ADD-TO-CART on COLLECTION-PAGE---------------

    {% if template contains "collection" %}
        $(".productpageCstmAddBtn").click(function(){
          let infoBtn = $(this).find('.collection_add_to_crt');
          
           let imgUrl = $(infoBtn).parent().parent();
          imgUrl = imgUrl[0].querySelector(".product-item__bg").getAttribute("data-bgset").split(" ")[0];
     let productID =  $(infoBtn).attr('product_id')
        let variantID =  $(infoBtn).attr('variant_id')
        let productTitle =  $(infoBtn).attr('product_title')
        let productPrice =  $(infoBtn).attr('product_price')
        let discount = "{{ product.compare_at_price | minus: product.price }}"/100
        let ImageURL = $(infoBtn).attr('product_img_url')
        ImageURL = `https://www.a-squad.in/${ImageURL}`
        let productType = $(infoBtn).attr('product_type')
        let productMRP = "{{ product.compare_at_price_max }}"/100
        let currency = "INR"
        let availability = "{{ product.available }}"
        var date = new Date().toLocaleString();
         Moengage.track_event("Add_To_Cart", {
        "DateTime": date,
        "Total Quantity":1,
        "product_id": productID,
        "product_variant_id": variantID,
        "product_title":productTitle,
        "Vendor Name":vendorName,
        "product_price":productPrice,
        "discount":discount,
        "Product Category":productType,
        "product_MRP":productMRP,
        "Product URL":"https://www.a-squad.in{{ product.featured_image }}",
        "Image URL":imgUrl,
        "currency":currency,
        "availability":availability,
        "Source": utm_parametercart,
  
        });
        });
    {% endif %}


    // -----------------------------ADD-TO-CART on CART-PLUS-btn------------------------------
      $('body').on('click', '.cart__quantity-plus', function(){
        let productID =  $(this).attr('product_id')
        let productImg =  $(this).attr('product_image');
        productImg = `https://www.a-squad.in/cdn/shop/${productImg}`;
        let variantID =  $(this).attr('variant_id')
        let productTitle =  $(this).attr('product_title')
        let productPrice =  $(this).attr('product_price')
        let discount = $(this).attr('discount')
        let ImageURL = $(this).attr('product_img_url')
        ImageURL = `https://www.a-squad.in/${ImageURL}`
        let productType = $(this).attr('product_type')
        let productMRP = $(this).attr('product_MRP')
        let currency = "INR"
        productPrice = productPrice.replace("₹","").trim()
        let productUrl = $(this).attr('product_url');
        productUrl = `https://www.a-squad.in/${productUrl}`
         Moengage.track_event("Add_To_Cart", {
          "Product ID": productID,
        "Variant ID": variantID,
        "Product Title":productTitle,
        "Vendor Name":vendorName,
        "Product Price":productPrice,
        "Discount Amount":discount,
        "Product Category":productType,
        "Product URL":productUrl,
        "Image URL":productImg,
        "Total Quantity":1,
        "MRP":productMRP,
        "Currency":currency,
        "Source": utm_parametercart,
     
        });
      })




// -----------------------------------------PRODUCT-VIEWED----------------------------
  
   {% if template contains 'product' %}
    setTimeout(()=>{
        var date = new Date().toLocaleString();
      var review = document.querySelector(".jdgm-prev-badge__text").textContent.split(" ")[0]
      Moengage.track_event("Product_Viewed", {
        "DateTime": date,
        "Product ID": '{{ product.id }}',
        "Total variants":"{{product.variants.size}}",
        "Variant ID": "{{product.selected_or_first_available_variant.id}}",
        "Product Title":'{{ product.title }}',
        "Product URL":"https://www.a-squad.in{{ product.url }}",
        "Image URL":"www.a-squad.in/cdn/shop/{{ product.featured_image }}",
        "Vendor Name":vendorName,
        "Product Price":'{{product.price}}'/100,
        "Product Category":"{{ product.type }}",
        "Discount":"{{ product.compare_at_price | minus: product.price }}"/100,
        "MRP":"{{ product.compare_at_price_max }}"/100,
        "Currency":"INR",
        "Product Rating":review,
        "Availability":"{{ product.available }}",
        "Source": utm_parametercart,
        "URL":window.location.href
        });
    },2000)
  {% endif %}


     //-----------------------------------SEARCH-----------------------------------------
    const searchBtn  = document?.querySelector(".wz-search-from input"); 
      searchBtn.addEventListener('change',()=>{
        const products = $(".wizzy-result-product");
        const num = $(".wizzy-summary-head").text().split(" ")[0];
         let productsLength = products ? products.length : 0; // Ensure products is not null
        const empty = document.querySelector(".wizzy-empty-results-content");
        if(empty){
          productsLength = 0;
        }
          Moengage.track_event("Product_Searched", {
            "Search Term":searchBtn.value,
            "Source": utm_parametercart,
            "Item Count":num,  
          })

});

});


</script>
