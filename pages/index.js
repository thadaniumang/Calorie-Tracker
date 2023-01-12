// Components
import Account from '../components/Account';
import withAuth from '../wrappers/withAuth';

const Home = () => {

  return (
    <div className="">
      <Account />
      {/* Today's Diet */}
      {/* Modify Date to see statistics */}
    </div>
  )
}

export default withAuth(Home)