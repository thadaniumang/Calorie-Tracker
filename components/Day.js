import { useState, useEffect } from 'react';

import Card from './NutrientCard';

import supabase from '../supabase';

// RecoilJS
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';


const Day = ({ date }) => {

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
        supabase.from('Diet').select('*').eq('user', userId).eq('date', date).then((res) => {
            if (res.error) {
                setError(res.error);
            } else {
                return res.data;
            }
        }).then((data) => {
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
            console.log(err);
        })

    }, [date, userId]);


    return (
        <div className="my-4 grid md:grid-cols-2 gap-4">
            {nutrients.map((nutrient) => (
                <Card key={nutrient.name} name={nutrient.name} intake={nutrient.intake} unit={nutrient.unit} image={nutrient.image} />
            ))}
        </div>
    );
}
 
export default Day;