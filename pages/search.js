// React and NextJS
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

// Components
import withAuth from '../wrappers/withAuth';
import FoodSelect from '../components/FoodSelect';
import AddToDiet from '../components/AddToDiet';
import { RingLoader } from 'react-spinners';
import Error from '../components/Error';

// API
import { axiosInstance, appId, appKey } from './api/foodapi';

// Recoil
import { useRecoilState } from 'recoil';
import { selectedFoodData } from '../atoms';


const Search = () => {
    const [name, setName] = useState('');
    const [searchFoodItems, setSearchFoodItems] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedFood, setSelectedFood] = useRecoilState(selectedFoodData);
    const [foodChosen, setFoodChosen] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFoodChosen(false);
        setSelectedFood(null);

        const data = {
            "ingr": name,
            "app_id": appId,
            "app_key": appKey
        }

        axiosInstance.get('parser', {
            params: data,
        }).then((response) => {
            return response.data.hints;
        }).then((foodItems) => {
            setSearchFoodItems(foodItems);
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Head>
                <title>Dietto - Add Item</title>
            </Head>
            {/* Back to Home Link */}
            <div className="flex justify-center">
                <Link href="/" className="text-purple-600 font-semibold">Back to Home</Link>
            </div>

            <div className="pt-2 mx-auto text-gray-600 relative">
                <input
                    className="w-full border-2 border-gray-300 bg-white py-2 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search For The Item You Had"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <button className="absolute right-0 bottom-3 mx-4" onClick={handleSearch}>
                    <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ "enableBackground": "new 0 0 56.966 56.966" }}><path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
            </div>
            <div className="my-4">
                <hr />
                <div className="w-full">
                    <div className="p-4">
                        {
                            loading && 
                            <div className="flex justify-center my-5">
                                <RingLoader color="rgb(147 51 234)" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
                            </div>
                        }
                        {
                            (error || (searchFoodItems && searchFoodItems.length == 0)) &&
                            <Error message="Coudn't find what you are looking for" />
                        }
                        {!loading && !foodChosen && <FoodSelect searchFoodItems={searchFoodItems} setFoodChosen={setFoodChosen} setLoading={setLoading} />}
                        {foodChosen && <AddToDiet loading={loading} setLoading={setLoading} />}
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default withAuth(Search);