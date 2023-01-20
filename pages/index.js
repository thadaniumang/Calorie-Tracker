// ReactJS and NextJS
import React, { useState } from 'react';
import Head from 'next/head'
import Router from "next/router"

// Components
import Navbar from '../components/Navbar';
import withAuth from '../wrappers/withAuth';
import Day from '../components/Day';
import DatePicker from '../components/DatePicker';

// Supabase
import supabase from "../supabase"


const Home = () => {

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [loading, setLoading] = useState(true);
  
  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const setToday = () => {
    setDate(new Date().toISOString().slice(0, 10));
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error signing out. Please try again.")
    };
    return Router.push("/auth/login");
  }

  return (
    <div className="">
      <Head>
        <title>Dietto - Home</title>
      </Head>
      {/* Navbar */}
      <Navbar />
      {/* Today's Diet */}
      <Day date={date} loading={loading} setLoading={setLoading} />
      {/* Modify Date to see statistics */}
      <div className="my-8 flex flex-col items-center">
        <p className='text-purple-600 font-semibold -mb-1'>Select Date to View Diet</p>
        <DatePicker date={date} handleDateChange={handleDateChange} setToday={setToday} />
      </div>
      <div className="flex justify-center border-t-2 pt-8 pb-4">
        <button className="px-3 py-1 mx-3 rounded-lg border border-gray-600 hover:opacity-50" onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  )
  
}

export default withAuth(Home)