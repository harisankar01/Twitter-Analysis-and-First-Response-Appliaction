import React from 'react'
import Chat from "../../components/GreatArea"
import { connectToDatabase } from "../../src/service/db";
export default function Departments({val,value}) {
  return (
    <Chat val={val}></Chat>
  )
}
export const getServerSideProps=async(context)=>{
    let name=context.query.departments;
    // console.log(name);
    let query;
if(name=="Fire"){
  query="fire breaks"
}
else if(name=="Traffic accidents"){
  query="accidents"
}
else if(name=="pollution"){
    query="pollution"
}
else if(name=="Sanity"){
    query="garbage"
}
else{
    query="police complaints"
}
  let db=await connectToDatabase(); 
  let val= JSON.parse(JSON.stringify(await db.collection("tweets").find({$and:[{Department:`${query}`},{Prediction:"1.0"}]}).sort({$Time_of_tweet:1}).limit(50).toArray()));
  let value= JSON.parse(JSON.stringify(await db.collection("Chat").find({Department: name}).toArray()));
return {
    props:{
      val,value
    }
}
}