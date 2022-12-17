import '../styles/globals.css'
import { RecoilRoot } from 'recoil'


function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div className='sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-5/12 mx-auto px-8 py-16'>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  )
}
export default MyApp