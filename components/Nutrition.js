// Static Props
export async function getStaticProps({ params }) {
    return {
        props: {
            food: params.food,
        }
    }
}


// Component
const Nutrition = ({ food }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-purple-600 border border-purple-600">
            <h2 className="text-2xl font-bold">{food.name}</h2>
            <div className="my-4">
                <p className='text-gray-700'>Quantity: <span className='font-semibold'>{food.quantity}</span></p>
                <p className='text-gray-700'>Measure: <span className='font-semibold'>{food.measure}</span></p>
            </div>
            <hr />
            <div className="mt-4 grid grid-cols-2">
                <div className="font-medium text-purple-600">Calories:</div>
                <div className="text-gray-700">{food.calories} kCal</div>
            </div>
            <div className="mt-4 grid grid-cols-2">
                <div className="font-medium text-purple-600">Protein:</div>
                <div className="text-gray-700">{food.protein} g</div>
            </div>
            <div className="mt-4 grid grid-cols-2">
                <div className="font-medium text-purple-600">Fat:</div>
                <div className="text-gray-700">{food.fat} g</div>
            </div>
            <div className="mt-4 grid grid-cols-2">
                <div className="font-medium text-purple-600">Carbohydrates:</div>
                <div className="text-gray-700">{food.carbs} g</div>
            </div>
            <div className="mt-4 grid grid-cols-2">
                <div className="font-medium text-purple-600">Fiber:</div>
                <div className="text-gray-700">{food.fiber} g</div>
            </div>
        </div>
    );
};

export default Nutrition;
