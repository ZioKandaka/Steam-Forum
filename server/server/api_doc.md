# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `POST /QR`
- `POST /midtransToken`

- `GET /steam/:search`
- `GET /gameDetail/:id` //ini
- `GET /gameReview/:id`
- `GET /user`

- `PATCH /donate`

&nbsp;

## 1. POST /register

Description:

- Create new user

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

_Response (201 - Created)_

```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "premium": "boolean",
    "verified": "boolean",
    "donation": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "_id": "string",
    "__v": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please fill all required input"
}
```

&nbsp;

## 2. POST /login

Description:

- Validate user existence and credentials. Return access token

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong email or password"
}
```

&nbsp;


## 3. POST /QR

Description:

- Create QR based on link that passed

Request:

- headers:

```json
{
  "token": "string"
}
```

- body:

```json
{
  "link": "string"
}
```

_Response (201 - Created)_

```json
  "QR in SVG format"
```

&nbsp;

## 4. POST /midtransToken

Description:

- Create token for payment gateway using midtrans

Request:

- headers:

```json
{
  "token": "string"
}
```

- body:

```json
{
  "donation": "integer"
}
```

_Response (201 - Created)_

```json
{
    "token": "4d190212-b1f8-4070-b86d-606e37315f29",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/4d190212-b1f8-4070-b86d-606e37315f29"
}
```

&nbsp;

## 5. GET /steam/:search

Description:

- Get steam game data for Rapid API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "search": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "appId": "1361210",
        "title": "Warhammer 40,000: Darktide",
        "url": "https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/?snr=1_7_7_151_150_1",
        "imgUrl": "https://cdn.akamai.steamstatic.com/steam/apps/1361210/capsule_sm_120.jpg?t=1678119908",
        "released": "30 Nov, 2022",
        "reviewSummary": [
            "Mixed",
            "54% of the 55,932 user reviews for this game are positive."
        ],
        "price": "39,99€31,99€"
    },
    {
        "appId": "1250410",
        "title": "Microsoft Flight Simulator 40th Anniversary Edition",
        "url": "https://store.steampowered.com/app/1250410/Microsoft_Flight_Simulator_40th_Anniversary_Edition/?snr=1_7_7_151_150_1",
        "imgUrl": "https://cdn.akamai.steamstatic.com/steam/apps/1250410/capsule_sm_120.jpg?t=1668186331",
        "released": "17 Aug, 2020",
        "reviewSummary": [
            "Mostly Positive",
            "78% of the 43,310 user reviews for this game are positive."
        ],
        "price": "6999€"
    },
    ...
]
```

&nbsp;

## 6. GET /gameDetail/:search

Description:

- Get steam game detail data for Rapid API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "search": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "appId": "1361210",
        "title": "Warhammer 40,000: Darktide",
        "url": "https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/?snr=1_7_7_151_150_1",
        "imgUrl": "https://cdn.akamai.steamstatic.com/steam/apps/1361210/capsule_sm_120.jpg?t=1678119908",
        "released": "30 Nov, 2022",
        "reviewSummary": [
            "Mixed",
            "54% of the 55,932 user reviews for this game are positive."
        ],
        "price": "39,99€31,99€"
    },
    {
        "appId": "1250410",
        "title": "Microsoft Flight Simulator 40th Anniversary Edition",
        "url": "https://store.steampowered.com/app/1250410/Microsoft_Flight_Simulator_40th_Anniversary_Edition/?snr=1_7_7_151_150_1",
        "imgUrl": "https://cdn.akamai.steamstatic.com/steam/apps/1250410/capsule_sm_120.jpg?t=1668186331",
        "released": "17 Aug, 2020",
        "reviewSummary": [
            "Mostly Positive",
            "78% of the 43,310 user reviews for this game are positive."
        ],
        "price": "6999€"
    },
    ...
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
