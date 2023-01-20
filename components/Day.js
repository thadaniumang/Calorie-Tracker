// ReactJS and NextJS
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Components
import Card from './NutrientCard';
import { RingLoader } from 'react-spinners';
import Error from './Error';

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
                    image: "/calories.png",
                },
                {
                    name: "Protein",
                    intake: protein.toFixed(2),
                    unit: "g",
                    image: "/protein.png",
                },
                {
                    name: "Carbohydrates",
                    intake: carbs.toFixed(2),
                    unit: "g",
                    image: "/carbs.png",
                },
                {
                    name: "Fat",
                    intake: fats.toFixed(2),
                    unit: "g",
                    image: "/fats.png",
                },
                {
                    name: "Fiber",
                    intake: fiber.toFixed(2),
                    unit: "g",
                    image: "/fiber.png",
                }
            ]);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        })

    }, [date, userId]);

    useEffect(() => {
        supabase.from('Goals').select('calorie, carbs, fats, fiber, protein').eq('user', userId).limit(1).single().then((res) => {
            if (res.error) {
                setError(res.error);
            } else {
                return res.data;
            }
        }).then((data) => {
            if (!(data === undefined || data === null || data === "" || data === [] || data === {} || data === 0 || data === false)) {
                setNutrients((prev) => {
                    return prev.map((item) => {
                        switch (item.name) {
                            case "Calories":
                                return {
                                    ...item,
                                    goal: data.calorie
                                }
                            case "Protein":
                                return {
                                    ...item,
                                    goal: data.protein
                                }
                            case "Carbohydrates":
                                return {
                                    ...item,
                                    goal: data.carbs
                                }
                            case "Fat":
                                return {
                                    ...item,
                                    goal: data.fats
                                }
                            case "Fiber":
                                return {
                                    ...item,
                                    goal: data.fiber
                                }
                            default:
                                return item;
                        }
                    })
                })
            } else if (userId) {
                supabase.from('Goals').insert([{ 'user': userId }]).then((res) => {
                    if (res.error) {
                        setError(res.error);
                    } else {
                        return res.data;
                    }
                })
                setNutrients((prev) => {
                    return prev.map((item) => {
                        switch (item.name) {
                            case "Calories":
                                return {
                                    ...item,
                                    goal: 1600
                                }
                            case "Protein":
                                return {
                                    ...item,
                                    goal: 65
                                }
                            case "Carbohydrates":
                                return {
                                    ...item,
                                    goal: 200
                                }
                            case "Fat":
                                return {
                                    ...item,
                                    goal: 50
                                }
                            case "Fiber":
                                return {
                                    ...item,
                                    goal: 25
                                }
                            default:
                                return item;
                        }
                    })
                })
            }
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [nutrients]);

    if (error) { 
        return <Error />
    } else if (loading) {
        return (
            <div className="flex justify-center my-5">
                <RingLoader color="rgb(147 51 234)" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
            </div>
        );
    } else {
        return (
            <div className="mt-8 mb-4 grid lg:grid-cols-2 gap-4">
                {nutrients.map((nutrient, index) => (
                    <Card key={index} name={nutrient.name} intake={nutrient.intake} goal={nutrient.goal} unit={nutrient.unit} image={nutrient.image} />
                ))}
                <Link href={`/diet?date=${date}`} className="bg-purple-600 flex justify-center items-center text-white rounded-lg hover:border border-purple-600 hover:text-purple-600 hover:bg-white py-6 px-4 lg:p-0">
                    Food Log
                </Link>
            </div>
        );
    }

    
}
 
export default Day;