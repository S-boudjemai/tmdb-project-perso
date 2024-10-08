import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import MoviesCardSlider from "./MoviesCardSlider";
import { useEffect, useState } from "react";
import { Movie } from "@types";

function ActiveSlider() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=f2aacbaffec6c04e80ab5fdf983b982d"
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setData(data.results);
      });
  }, []);

  return (
    <div className="flex mt-20 items-center justify-center flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black relative py-12">
      <h1 className="text-center text-white text-4xl font-bold mb-10 tracking-wide">
        À la une
      </h1>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {data
          .filter((movie) => movie.vote_average > 7)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <MoviesCardSlider
                movie={movie}
                className="h-[250px] w-[215px] lg:h-[500px] lg:w-[350px] mb-12 transform transition-transform hover:scale-105 rounded-lg shadow-lg overflow-hidden"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default ActiveSlider;
