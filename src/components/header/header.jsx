import Link from "next/link";
import Image from "next/image"
export default function Header(){
    return(
        <header>
        <div className='topnav'>
          <Image src={'/images/favicon.png'} width={50} height={50} alt='logo'/>
        <nav>
          <ul>
            <li>
            <Link href="/" passHref>
            Home
          </Link>
            </li>
            <li><Link href="/events" passHref>
            Events
          </Link>
          </li>
          <li>
          <Link href="/about" passHref>
            About us
          </Link>
          </li>
          </ul>
          
          
        </nav>
        </div>
        <h1>matar khtar malocia cacainer</h1>
      </header>
    )
}