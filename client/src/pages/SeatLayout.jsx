import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData, assets } from '../assets/assets';
import Loading from '../components/Loading';
import { ClockIcon, ArrowRightIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import toast from 'react-hot-toast';
import BlurCircle from '../components/BlurCircle';

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getShow = () => {
      const showData = dummyShowsData.find(show => show._id === id);
      if (showData) {
        setShow({
          movie: showData,
          dateTime: dummyDateTimeData,
        });
      }
    };
    getShow();
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error("You can only select up to 5 seats");
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2 justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
              ${selectedSeats.includes(seatId) ? "bg-primary text-white" : "bg-transparent"}`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (!show) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 gap-8">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-4 space-y-1">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition 
              ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" className="mb-4" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          disabled={!selectedTime || selectedSeats.length === 0}
          onClick={() => navigate('/my-bookings')}
          className={`flex items-center gap-1 mt-20 px-10 py-3 text-sm rounded-full font-medium transition 
          ${!selectedTime || selectedSeats.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dull active:scale-95'}`}
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
