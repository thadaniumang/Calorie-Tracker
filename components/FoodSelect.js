import React, { useState } from 'react';
import Image from 'next/image';

// Recoil
import { useRecoilState } from 'recoil';
import { selectedFoodData } from '../atoms';

const FoodSelect = ({ searchFoodItems, setFoodChosen }) => {
    
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedPortionUri, setSelectedPortionUri] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [selectedFoodRecoilState, setSelectedFoodRecoilState] = useRecoilState(selectedFoodData);
    
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

        setSelectedFoodRecoilState(data);
        setFoodChosen(true);
    }

    return (
        <>
            <div className="w-full my-4">
                {
                    searchFoodItems && searchFoodItems.map((item, index) => (
                        <>
                            <div key={index} className={`mt-3 border-b py-2 px-4 grid grid-cols-4 hover:border hover:border-purple-600 hover:rounded-lg cursor-pointer ${selectedFood === item ? "border-2 border-purple-600 rounded-lg" : ""}`} onClick={() => setSelectedFood(item)}>
                                <p className="col-span-2 md:col-span-3 px-2 py-3" >
                                    {item.food.label}
                                </p>
                                <div className="col-span-2 md:col-span-1">
                                    {item.food.image && <Image src={item.food.image} width={100} height={100} alt={item.food.knownAs} className="rounded-full" />}
                                </div>
                            </div>
                            {
                                selectedFood === item &&
                                <div className="border rounded-lg border-purple-600 grid grid-cols-2">
                                    {
                                            item.measures.length > 0 && item.measures.map((measure, index) => (
                                            <>
                                                <div key={index} className={`px-6 py-4 " ${selectedPortionUri === measure.uri ? " bg-purple-600 text-white" : ""}`} onClick={() => setSelectedPortionUri(measure.uri)}>
                                                    <p className='cursor-pointer'>{measure.label}</p>
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
        </>
    );
}
 
export default FoodSelect;