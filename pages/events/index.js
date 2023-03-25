import Image from "next/image";
import Link from "next/link";
const EventsPage = ({ data }) => {
  return (
    <div className="events__page">
        {data.map((ev)=>(
            <Link className="events__card" key={ev.id} href={`/events/${ev.id}`} passHref>
        
          <Image alt={ev.title} width={300} height={300} src={ev.image}/>
          <h2>{ev.title}</h2>

       
        </Link>
        ))}
    </div>
  )
};
export default EventsPage;
export async function getStaticProps() {
    const {events_categories}= await import ('../Data/data.json');
    console.log(events_categories)
    return{
      props:{
        data:events_categories
      }
    }
}
