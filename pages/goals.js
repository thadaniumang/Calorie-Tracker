// ReactJS and NextJS
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import withAuth from '../wrappers/withAuth';
import { RingLoader } from 'react-spinners';

// Recoil
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

// Supabase
import supabase from '../supabase';


// Component
const Goals = () => {
    const [goals, setGoals] = useState({
        calorie: 1500,
        protein: 65,
        carbs: 200,
        fats: 55,
        fiber: 25
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useRecoilState(userState);

    useEffect(() => {
        async function getGoals() {
            setLoading(true);
            try {
                const { data } = await supabase.from('Goals').select('calorie, carbs, fats, fiber, protein').eq('user', userId).limit(1).single();
                setGoals(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        if (userId) {
            getGoals();
        }
    }, [userId]);

    const router = useRouter();

    const handleChange = (e) => {
        setGoals({
            ...goals,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { res, error } = await supabase.from('Goals').update(goals).eq('user', userId);
            router.push('/');
        } catch (error) {
            setError(error);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center my-5">
                <RingLoader color="rgb(147 51 234)" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
            </div>
        );
    } else {
        return (
            <>
                <h2 className="text-lg font-medium mb-4 text-purple-600 text-center">Set Your Goals</h2>
                <form className="bg-white p-6 rounded-lg grid sm:grid-cols-2 gap-x-4 gap-y-3">
                    <label className="block mb-2 font-medium text-gray-700 col-span-1">
                        Calorie:
                        <input
                            className="border border-purple-600 p-2 rounded-lg w-full mt-2 text-gray-600 font-normal"
                            type="number"
                            name="calorie"
                            value={goals.calorie}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-2 font-medium text-gray-700 col-span-1">
                        Carbohydrates:
                        <input
                            className="border border-purple-600 p-2 rounded-lg w-full mt-2 text-gray-600 font-normal"
                            type="number"
                            name="carbs"
                            value={goals.carbs}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-2 font-medium text-gray-700 col-span-1">
                        Protein:
                        <input
                            className="border border-purple-600 p-2 rounded-lg w-full mt-2 text-gray-600 font-normal"
                            type="number"
                            name="protein"
                            value={goals.protein}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-2 font-medium text-gray-700 col-span-1">
                        Fats:
                        <input
                            className="border border-purple-600 p-2 rounded-lg w-full mt-2 text-gray-600 font-normal"
                            type="number"
                            name="fats"
                            value={goals.fats}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block mb-2 font-medium text-gray-700 col-span-1">
                        Fiber:
                        <input
                            className="border border-purple-600 p-2 rounded-lg w-full mt-2 text-gray-600 font-normal"
                            type="number"
                            name="fiber"
                            value={goals.fiber}
                            onChange={handleChange}
                        />
                    </label>
                    <button className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg mt-4" onClick={handleSubmit}>Submit</button>
                </form>
            </>
        );
    }
}

export default withAuth(Goals);