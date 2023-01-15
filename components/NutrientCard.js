// NextJS
import Image from 'next/image';


// Static Props
export async function getStaticProps({ params }) {
    return {
        props: {
            name: params.name,
            intake: params.intake,
            unit: params.unit,
            image: params.image,
        }
    }
}


// Component
const Card = ({ name, intake, unit, image }) => {
    return (
        <>
            <div className="shadow-md grid grid-cols-4 rounded-md px-4 py-3 border border-purple-600">
                <div className="flex justify-center align-middle items-center">
                    <Image src={image} alt={name} width={200} height={200} />
                </div>
                <div className="col-span-3 text-left pl-5 pr-2 py-2">
                    <h3 className="font-semibold text-lg my-1">{name}</h3>
                    <p>
                        <span className="font-medium text-purple-600">{intake}</span>
                        <span className="font-medium"> {unit}</span>
                    </p>
                </div>
            </div>
        </>
    );
}
 
export default Card;