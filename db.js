const mongoose = require("mongoose");
console.log("Connected to DB");
mongoose.connect("mongodb://127.0.0.1:27017/SellingApp")
const Schema =  mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
   
    email:{type: String, unique: true},
    password:String,
    firstName:String,
    lastName:String
})

const AdminSchema = new Schema({

    email:{type: String, unique: true},
    password:String,
    firstname:String,
    lastname:String
})

const CourseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageURL:String,
    creator:ObjectId
})

const PurchasesSchema = new Schema ({
    CourseId:ObjectId ,
    UserId:ObjectId
})

const UserModel = mongoose.model("user",UserSchema);
const AdminModel = mongoose.model("admin",AdminSchema);
const CourseModel = mongoose.model("course",CourseSchema);
const PurchasesModel = mongoose.model("purchases",PurchasesSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel
}