import Link from "next/link";
import Image from "next/image";
export default function HomePage({data}){
// export const HomePage=(({data})=>{
return(
    <main>
      <div className="home__body">
      {data.map((ev)=>(
      <Link className="card" key={ev.id} href={`/events/${ev.id}`}>
      <Image alt={ev.title} width={600} height={400} src={ev.image}/>
      <div className="content">
      <h2>{ev.title}</h2>
      <p>{ev.description}</p>
      </div>
    </Link>
    ))}
      </div>
  </main>
)
    }