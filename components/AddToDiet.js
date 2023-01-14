// React and NextJS
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Recoil
import { useRecoilState } from 'recoil';
import { selectedFoodData, userState } from '../atoms';

// Components
import Nutrition from './Nutrition';
import DatePicker from './DatePicker';
import Error from './Error';

// Axios
import { axiosInstance, appId, appKey } from '../pages/api/foodapi';
import supabase from '../supabase';

const AddToDiet = ({ loading, setLoading }) => {

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
                "calories": parseFloat(data.calories).toFixed(2),
                "totalWeight": parseFloat(data.totalWeight).toFixed(2),
                "fat": parseFloat(data.totalNutrients.FAT.quantity).toFixed(2),
                "carbs": parseFloat(data.totalNutrients.CHOCDF.quantity).toFixed(2),
                "protein": parseFloat(data.totalNutrients.PROCNT.quantity).toFixed(2),
                "fiber": parseFloat(data.totalNutrients.FIBTG.quantity).toFixed(2),
                "name": data.ingredients[0].parsed[0].food,
                "measure": data.ingredients[0].parsed[0].measure,
                "quantity": parseFloat(data.ingredients[0].parsed[0].quantity).toFixed(2)
            }

            setNutritionalInfo(nutrition);
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false);
        })
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
        } catch (err) {
            return err;
        }
    }

    if (error) {
        return <Error message="Error while loading nutrients" />
    } else if (!loading) {
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
    
}
 
export default AddToDiet;