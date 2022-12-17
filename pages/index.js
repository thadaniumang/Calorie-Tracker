// Components
import Account from '../components/Account';
import withAuth from '../wrappers/withAuth';


const Home = () => {
  return (
    <div className="">
      <Account />
    </div>
  )
}

export default withAuth(Home)