const Error = ({ message = null }) => {
    return (
        <div className="flex flex-col items-center text-center mt-6 mb-4">
            <div className="text-3xl font-medium text-red-600">Oops!</div>
            {
                message && <div className="text-lg text-gray-700 mb-4">{message}</div>
            }
            {
                !message && <div className="text-lg text-gray-700 mb-4">Something went wrong</div>
            }
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-md">
                <div className="text-red-700">Please refresh the page or try again.</div>
                <div className="text-red-700">If the problem persists, please contact us.</div>
            </div>
        </div>
    );
}
 
export default Error;