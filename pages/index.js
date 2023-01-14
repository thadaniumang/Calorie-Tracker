import React, { useState } from 'react';

// Components
import Navbar from '../components/Navbar';
import withAuth from '../wrappers/withAuth';
import Day from '../components/Day';
import DatePicker from '../components/DatePicker';


const Home = () => {

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [loading, setLoading] = useState(true);
  
  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const setToday = () => {
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Today's Diet */}
      <Day date={date} loading={loading} setLoading={setLoading} />
      {/* Modify Date to see statistics */}
      <div className="my-8 flex flex-col items-center">
        <p className='text-purple-600 font-semibold -mb-1'>Select Date to View Diet</p>
        <DatePicker date={date} handleDateChange={handleDateChange} setToday={setToday} />
      </div>
    </div>
  )
  
}

export default withAuth(Home)