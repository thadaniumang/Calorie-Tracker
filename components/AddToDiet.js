// React and NextJS
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Recoil
import { useRecoilState } from 'recoil';
import { selectedFoodData, userState } from '../atoms';

// Components
import Nutrition from './Nutrition';
import DatePicker from './DatePicker';

// Axios
import { axiosInstance, appId, appKey } from '../pages/api/foodapi';
import supabase from '../supabase';

const AddToDiet = () => {

    const router = useRouter();

    const [nutritionalInfo, setNutritionalInfo] = useState({});
    const [selectedFood, setSelectedFood] = useRecoilState(selectedFoodData);
    const [userId, setUserId] = useRecoilState(userState);

    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.post('nutrients', { 
                "ingredients": [
                    {
                        "quantity": parseInt(selectedFood.ingredients[0].quantity),
                        "measureURI": selectedFood.ingredients[0].measureURI,
                        "foodId": selectedFood.ingredients[0].foodId
                    }
                ]
            },
            {
                params: {
                    "app_id": appId,
                    "app_key": appKey
            }
        }).then((response) => {
            return response.data;
        }).then((data) => {
            const nutrition = {
                "calories": parseFloat(data.calories),
                "totalWeight": parseFloat(data.totalWeight),
                "fat": parseFloat(data.totalNutrients.FAT.quantity),
                "carbs": parseFloat(data.totalNutrients.CHOCDF.quantity),
                "protein": parseFloat(data.totalNutrients.PROCNT.quantity),
                "fiber": parseFloat(data.totalNutrients.FIBTG.quantity),
                "name": data.ingredients[0].parsed[0].food,
                "measure": data.ingredients[0].parsed[0].measure,
                "quantity": parseFloat(data.ingredients[0].parsed[0].quantity)
            }

            setNutritionalInfo(nutrition);
        }).catch((error) => {
            console.log(error)
            setError(error)
        });
    }, [])

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const setToday = () => {
        const now = new Date().toISOString().slice(0, 10);
        setDate(now);
    };

    const handleSubmit = async () => {
        const data = {
            "user": userId,
            "date": date,
            ...nutritionalInfo
        }

        try {
            await supabase.from('Diet').insert([data]);
            router.push('/');
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return (
        <>
            <div className="text-xl font-medium mb-2 text-purple-600">Food Item Chosen</div>
            <div className="w-full my-4">
                <Nutrition food={nutritionalInfo} />
                <DatePicker date={date} handleDateChange={handleDateChange} setToday={setToday} />
            </div>
            <button className="mt-3 hover:bg-purple-600 text-purple-600 border border-purple-600 hover:text-white py-1 px-4 rounded-lg" onClick={handleSubmit}>Submit</button>
        </>
    );
}
 
export default AddToDiet;