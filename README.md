# REST API of NICE GADGETS
[API-LINK](https://stalwart-dolphin-d2ae39.netlify.app/.netlify/functions/server/products)
## Endpoints:
- ### `[API_SUBPATH]/products`
- ### `[API_SUBPATH]/products/discount` - get 10 products with the closest discount
- ### `[API_SUBPATH]/products/new` - get 10 newest products
  Allowed methods: `[get]`
    - _without **query** params_ - get all products sorted by newest by default
    - `?sort={newest}` - get sorted products by date of release
    - `?sort={alphabetically}` - get alphabetically sorted products by name
    - `?sort={cheapest}` - get sorted products by cheapest price
    - `?sort={expensive}` - get sorted products by the expensive price
    - `page={number}&perPage={4|8|16|all}` - get data by page per page value

  Params 
    - `/:productId` -  get extensive info about the product by `productId`
