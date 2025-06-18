import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import { StarIcon, CheckIcon, DeleteIcon } from 'lucide-react'
import { dummyShowsData } from '../../assets/assets'
import { kConverter } from '../../lib/kConverter'

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setDateTimeSelection] = useState([])
  const [dateTimeInput, setDateTimeInput] = useState("")
  const [showPrice, setShowPrice] = useState("")

  useEffect(() => {
    setNowPlayingMovies(dummyShowsData)
  }, [])

  const handleDateTimeAdd = () => {
    if (dateTimeInput && !dateTimeSelection.includes(dateTimeInput)) {
      setDateTimeSelection((prev) => [...prev, dateTimeInput])
      setDateTimeInput("")
    }
  }

  const handleRemoveTime = (time) => {
    setDateTimeSelection((prev) => prev.filter((t) => t !== time))
  }

  const formatDateTime = (dtString) => {
    const dt = new Date(dtString)
    if (isNaN(dt)) return dtString
    return dt.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (nowPlayingMovies.length === 0) return <Loading />

  return (
    <>
      <Title text1="Add" text2="Shows" />

      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-[160px] cursor-pointer opacity-40 hover:opacity-100 hover:-translate-y-1 transition duration-300`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Select Date and Time</label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {dateTimeSelection.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 font-medium">Selected Date-Times</h2>
          <ul className="space-y-2">
            {dateTimeSelection.map((time) => (
              <li
                key={time}
                className="flex items-center gap-3 border border-primary px-3 py-1 rounded"
              >
                <span>{formatDateTime(time)}</span>
                <DeleteIcon
                  onClick={() => handleRemoveTime(time)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  width={16}
                  height={16}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Add Show</button>
    </>
  )
}

export default AddShows
