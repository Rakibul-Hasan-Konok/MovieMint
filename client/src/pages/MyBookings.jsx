import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import timeFormat from "../lib/timeFormate";
import { dateFormat } from "../lib/dateFormat";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "৳";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (isLoading) return <div className="text-center py-20"><Loading /></div>;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />

      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/10 border border-primary/20 rounded-lg mt-4 p-4 max-w-3xl"
        >
          {/* Movie Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={item?.show?.movie?.poster_path}
              alt={`${item?.show?.movie?.title} poster`}
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
            />
            <div className="flex flex-col justify-between gap-2">
              <p className="font-semibold text-lg">{item?.show?.movie?.title}</p>
              <p className="text-sm text-gray-400">{timeFormat(item?.show?.movie?.runtime)}</p>
              <p className="text-sm text-gray-400">{dateFormat(item?.show?.showDateTime)}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold mb-3">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <button className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
                  Pay Now
                </button>
              )}
            </div>
            <div className="text-sm">
              <p>
                <span className="text-gray-400">Total Tickets:</span> {item.bookedSeats.length}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span> {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
