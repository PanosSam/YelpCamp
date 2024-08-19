
const mongoose = require("mongoose");
const cities = require ("./cities");
const { places, descriptors } = require("./seedHelpers")
const Campground= require("../models/campgrounds");
const campgrounds = require("../models/campgrounds");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample= (array)=> array[Math.floor(Math.random()*array.length)];


const seedDB = async ()=>{
    await Campground.deleteMany({});
   for(let i=0; i<50; i++){
    const random1000= Math.floor(Math.random()*1000);
    const price = Math.floor(Math.random()*20) + 10;
   const camp= new Campground({
        location:`${cities[random1000].city}, ${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
        image:`https://picsum.photos/400?random=${Math.random()}`,
        description :` Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Tempora officiis autem nisi, ab reiciendis voluptas corrupti velit ratione repudiandae 
         optio fugit iure beatae quaerat sapiente quam ut fugiat expedita neque.`,
        price

    })
    await camp.save();
   }
}
seedDB().then(()=>{
    mongoose.connection.close();
});