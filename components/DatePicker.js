// Static Props
export async function getStaticProps({params}) {
  return {
    props: {
      date: params.date,
      handleDateChange: params.handleDateChange,
      setToday: params.setToday,
    }
  }
}


// Component
const DatePicker = ({ date, handleDateChange, setToday }) => {

  return (
    <div className='flex justify-items-start gap-x-4 mt-4'>
      <input className="form-input rounded-md shadow-sm py-1 px-3 text-gray-700 border-2 border-purple-600" type="date" value={date} onChange={handleDateChange} />
      <button className="bg-purple-600 text-white rounded-md py-1 px-5" onClick={setToday}>Today</button>
    </div>
  );
};

export default DatePicker;
