import Image from 'next/image';
import Link from 'next/link';
const EventsPage=({data,pageName})=>{
    return(
        <div className='cat__events'>
            <h1>events in {pageName}</h1>
            <div className='content'>
            {data.map((ev)=>(
            <Link className='cat__card' key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                
                   <Image alt={ev.title} width={300} height={300} src={ev.image}/>
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>

                    
            </Link>
        ))}
            </div>
        </div>
    )
}
export default EventsPage;
export async function getStaticPaths(){
    const {events_categories}= await import ('../../Data/data.json');
    const allPaths=events_categories.map((ev)=>{
        return{
            params:{
                cat:ev.id.toString()
            }
        }
    })
    console.log(allPaths);
    return{
    paths:allPaths,
    fallback:false
    }
}
export async function getStaticProps(context){
    const id=context?.params.cat;
    const {allEvents}=await import('../../Data/data.json');
    const data=allEvents.filter((ev)=>ev.city===id);
    return{
        props:{data,pageName:id}
    }
}