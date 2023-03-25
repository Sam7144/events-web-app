import { useRef,useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
const Event=({data})=>{
    const[message,setMessage]=useState('');
    const inputEmail=useRef(); 
    const router=useRouter()
    console.log(router)
    const submitForm=async(e)=>{
        e.preventDefault();
        const emailValue=inputEmail.current.value;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailValue.match(validRegex)){
            setMessage('please enter a correct email');
        }
        const eventId=router?.query.id;
        try{
            const response=await fetch('/api/email-registration',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email:emailValue,eventId})
            })
            //if(!response)throw new Error(`error:${response.status} `);
            const data=await response.json();
            setMessage(data.msg);
            inputEmail.current.value='';

        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div className='cat__final'>
         <Image src={data.image} width={500} height={300} alt={data.title}/>
         <h2>{data.title}</h2>
         <p>{data.description}</p>
         <form onSubmit={submitForm} className='email__registration'>
         <label>Get Registered for this event </label>
         <input ref={inputEmail} required id="email" placeholder="enter your email"/>
         <button type="submit">submit</button>
         </form>
         <p>{message}</p>
        </div>
    )
}
export default Event;
export async function getStaticPaths(){
    const {allEvents}=await import('../../Data/data.json');
    const allpaths=allEvents.map((path)=>{
        return{
            params:{
                cat:path.city,
                id:path.id
            }
        }
    })
    return{
        paths:allpaths,
        fallback:false
    }
}
export async function getStaticProps(context){
    const id=context.params.id;
    const {allEvents}=await import('../../Data/data.json');
    const eventsData=allEvents.find(ev=>id===ev.id)
    return{
        props:{data:eventsData}
    }
}