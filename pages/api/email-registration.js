import path, { join } from "path";
import fs from 'fs';
function buildPath(){
    return path.join(process.cwd(),'Data','data.json')
}
function extractData(filepath){
    const jsonData=fs.readFileSync(filepath);
    const data=JSON.parse(jsonData);
    return data;

}
export default function handler(req,res){
    const{method}=req;
    const filepath=buildPath();
    const{events_categories,allEvents}=extractData(filepath);
    if(!allEvents){
        res.json(404,{
            status:'404',
            msg:'event data not found'
        })
    }
    if(method=='POST'){
        const{email,eventId}=req.body;
        if(!email||!email.includes('@')){
             res.status(422).json({msg:'invalid email address'})
            return
        }
        const newEvents=allEvents.map((ev)=>{
            if(ev.id===eventId){
                if(ev.emails_registered.includes(email)){
                    res.status(201).json({msg:'email already exists'})
                    return ev
                }
                return{
                    ...ev,emails_registered:[...ev.emails_registered,email]
                }
            }
            return ev
        })
        fs.writeFileSync(filepath,JSON.stringify({events_categories,allEvents:newEvents}))
        res.status(200).json({msg:`you have been registered successfully with email ${email} 
        to event ${eventId}`})
    }
}