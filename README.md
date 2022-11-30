# REST API of NICE GADGETS

## Endpoints:
- ### `[API_SUBPATH]/products`
  Allowed methods: `[get]`
    - _without **query** params_ - get all products sorted by newest by default
    - `?sort={newest}` - get sorted products by date of release
    - `?sort={alphabetically}` - get alphabetically sorted products by name
    - `?sort={cheapest}` - get sorted products by cheapest price
    - `?sort={expensive}` - get sorted products by the expensive price

  Params 
    - `/:productId` -  get extensive info about the product by `productId`
