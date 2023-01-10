// React and NextJS
import { useEffect, useState } from 'react'

// Supabase Config
import supabase from '../supabase';

// Components
import withAuth from '../wrappers/withAuth';

// API
import { axiosInstance, appId, appKey } from './api/foodapi';


const Create = () => {
    const [name, setName] = useState('');
    const [searchFoodItems, setSearchFoodItems] = useState(null);
    const [error, setError] = useState(null);


    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedPortionUri, setSelectedPortionUri] = useState("");
    const [quantity, setQuantity] = useState(1);

    
    const handleEat = () => {
        if (quantity === null || quantity <= 0 || selectedPortionUri === "" || selectedFood === null) {
            alert("Please select a food and quantity");
            return;
        }

        const data = {
            "ingredients": [
                {
                    "quantity": quantity,
                    "measureURI": selectedPortionUri,
                    "foodId": selectedFood.food.foodId
                }
            ]
        }

        console.log(data)
    }


    const handleSearch = async (e) => { 
        e.preventDefault();

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
            console.log(error)
            setError(error)
        });
    }

    return (
        <>
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
                    <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{"enableBackground": "new 0 0 56.966 56.966"}}><path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
            </div>
            <div className="my-4">
                <hr />
                <div className="w-full">
                    <div className="p-4">
                        <div className="text-xl font-medium mb-2 text-purple-600">Select Food Item</div>
                        <div className="w-full my-8">
                        {
                                searchFoodItems && searchFoodItems.map((item, index) => (
                                <>
                                    <div key={index} className="border-b py-2">
                                        <p className="px-2 py-3 relative hover:bg-gray-200 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedFood(item)} >
                                            {item.food.label}
                                        </p>
                                    </div>
                                    {
                                        selectedFood === item &&
                                        <div className="border rounded-lg border-purple-600 grid grid-cols-2">
                                            {
                                                    item.measures.length > 0 && item.measures.map((measure, index) => (
                                                    <>
                                                        <div key={index} className={`px-6 py-4 cursor-pointer" ${selectedPortionUri === measure.uri ? "bg-purple-600 text-white" : ""}`} onClick={() => setSelectedPortionUri(measure.uri)}>
                                                            <p>{measure.label}</p>
                                                            {
                                                                selectedPortionUri === measure.uri &&
                                                                <div className="flex flex-row mt-2">
                                                                    <input className="border rounded-md py-1 px-2 w-2/3 text-black" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity"/>
                                                                    <button className="w-1/3 px-4 py-2 rounded-md" onClick={handleEat}>
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default withAuth(Create);