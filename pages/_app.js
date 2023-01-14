import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import Image from 'next/image'
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div className='sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-5/12 mx-auto px-8 py-16'>
        <Link href="/" className="flex justify-center mb-10">
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  )
}
export default MyApp