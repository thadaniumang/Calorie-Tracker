// ReactJS
import { useState, useEffect } from 'react';

// Components
import Card from './NutrientCard';
import { RingLoader } from 'react-spinners';

// Supabase
import supabase from '../supabase';

// RecoilJS
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';


// Static Props
export async function getStaticProps({params}) {
    return {
        props: {
            date: params.date,
            loading: params.loading,
            setLoading: params.setLoading,
        }
    }
}


// Component
const Day = ({ date, loading, setLoading }) => {

    const [nutrients, setNutrients] = useState([
        {
            name: "Calories",
            intake: 0,
            unit: "kcal",
            image: "/calories.png"
        },
        {
            name: "Protein",
            intake: 0,
            unit: "g",
            image: "/protein.png"
        },
        {
            name: "Carbohydrates",
            intake: 0,
            unit: "g",
            image: "/carbs.png"
        },
        {
            name: "Fat",
            intake: 0,
            unit: "g",
            image: "/fats.png"
        },
        {
            name: "Fiber",
            intake: 0,
            unit: "g",
            image: "/fiber.png"
        }
    ]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useRecoilState(userState);

    useEffect(() => {
        setError(null);
        supabase.from('Diet').select('*').eq('user', userId).eq('date', date).then((res) => {
            if (res.error) {
                setError(res.error);
            } else {
                return res.data;
            }
        }).then((data) => {
            setLoading(true);
            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fats = 0;
            let fiber = 0;

            data.forEach((item) => {
                calories += item.calories;
                protein += item.protein;
                carbs += item.carbs;
                fats += item.fat;
                fiber += item.fiber;
            })

            setNutrients([
                {
                    name: "Calories",
                    intake: calories,
                    unit: "kcal",
                    image: "/calories.png"
                },
                {
                    name: "Protein",
                    intake: protein.toFixed(2),
                    unit: "g",
                    image: "/protein.png"
                },
                {
                    name: "Carbohydrates",
                    intake: carbs.toFixed(2),
                    unit: "g",
                    image: "/carbs.png"
                },
                {
                    name: "Fat",
                    intake: fats.toFixed(2),
                    unit: "g",
                    image: "/fats.png"
                },
                {
                    name: "Fiber",
                    intake: fiber.toFixed(2),
                    unit: "g",
                    image: "/fiber.png"
                }
            ]);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });

    }, [date, userId]);

    if (loading) {
        <div className="flex justify-center my-5">
            <RingLoader color="rgb(147 51 234)" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    } else {
        return (
            <div className="my-4 grid md:grid-cols-2 gap-4">
                {nutrients.map((nutrient, index) => (
                    <Card key={index} name={nutrient.name} intake={nutrient.intake} unit={nutrient.unit} image={nutrient.image} />
                ))}
            </div>
        );
    }

    
}
 
export default Day;