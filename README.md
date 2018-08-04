# Bringg
## Create Customer
   ### EndPoint (POST): 
   `localhost:3000/customer`
   ### Params:
   `{
      "name": "ori55",
      "address": "this is my address 1",
      "phone": "+972547654555",
      "city": "tel aviv"
    }`
    
 ## Create Order
   ### EndPoint (POST): 
   `localhost:3000/order`
   ### Params:
   `{	
      "name": "ori66",
      "phone": "+972547654666",
      "address": "to my new home",
      "title": "dominos 4",
      "city": "tel aviv"
    }`
    
 ## Get Customer orders (last week)
   ### EndPoint (GET): 
   `localhost:3000/order/:customer_phone`
   ### Example:
   `localhost:3000/order/+972547654555`
   
 ## Get Customers (was not required)
   ### EndPoint (GET): 
   `localhost:3000/customer`
 
