const BASE_URL =" https://places.googleapis.com/v1/places:searchText";

const config={
    headers:{
        'Content-Type':'application/json',
       'X-Goog-FieldMask':[
        'places.photos',

       ]
    }
}