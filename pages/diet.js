// ReactJS and NextJS
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

// Supabase
import supabase from '../supabase';

// Recoil
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

// Components
import withAuth from '../wrappers/withAuth';
import Error from '../components/Error';
import { RingLoader } from 'react-spinners';
import Nutrition from '../components/Nutrition';


const FoodLog = () => {
    const [foodItems, setFoodItems] = useState([]);

    const [userId, setUserId] = useRecoilState(userState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        async function fetchFoodItems() {
            try {
                const { data } = await supabase.from('Diet').select('id, name, calories, calories, measure, quantity, fat, carbs, protein, fiber').eq('date', router.query.date).eq('user', userId);
                setFoodItems(data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFoodItems();
    }, [userId, router.query.date]);

    const deleteItem = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setLoading(true);
            try {
                const { data } = await supabase.from('Diet').delete().eq('id', id);
                setFoodItems(foodItems.filter(item => item.id !== id));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (error) {
        return <Error />
    } else if (loading || !foodItems) {
        return (
            <div className="flex justify-center my-5">
                <RingLoader color="rgb(147 51 234)" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
            </div>
        );
    } else if (foodItems.length === 0) { 
        return (
            <div className="p-6">
                <h2 className="text-lg font-medium mb-4 text-purple-600 text-center">Food Log for {router.query.date}</h2>
                <div className="my-3">
                    <p className="text-center">No food items logged for this day.</p>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <Head>
                    <title>Dietto - Goals</title>
                </Head>
                <div className="flex justify-center">
                    <Link href="/" className="text-purple-600 font-semibold">Back to Home</Link>
                </div>
                <hr className="my-4"/>
                <div className="p-6">
                    <h2 className="text-lg font-medium mb-4 text-purple-600 text-center">Food Log for {router.query.date}</h2>
                    <div className="my-3">
                        {
                            foodItems.map((item, index) => {
                                return (
                                    <div className="relative my-4" key={index}>
                                        <Nutrition food={item} />
                                        <button className='absolute top-2 right-2' onClick={() => deleteItem(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /> </svg>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
};

export default withAuth(FoodLog);
