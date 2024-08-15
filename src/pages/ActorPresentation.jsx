import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonHome from "../components/ButtonHome"; // Si vous avez un bouton de retour à la maison
import spinner from "../assets/spinner.svg"; // Assurez-vous d'avoir un spinner ou remplacez par un autre visuel
import MoviesCard from "../components/MoviesCard";
import { useAuth } from "../contexts/authContext";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

function ActorPresentation() {
  const { id } = useParams(); // Récupérer l'id de l'acteur depuis l'URL
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);
  const API_KEY = "f2aacbaffec6c04e80ab5fdf983b982d";
  const [dataBaseFavorite, setDataBaseFavorite] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      // fetch les favoris
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8081/users/favorites/${userId}`
          );
          const favoritesData = response.data.favorites;

          setDataBaseFavorite(JSON.parse(favoritesData));
        } else {
          throw new Error("this should never happen");
          // console.error("userId est indéfini");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    const fetchActorDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=fr`
      );
      const dataActor = await response.json();
      setActor(dataActor);

      const responseCredits = await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=fr`
      );
      const dataCredits = await responseCredits.json();

      const topCredits = dataCredits.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5);

      setCredits(topCredits);
    };
    fetchActorDetails();
  }, [id]);

  if (!actor)
    return (
      <img src={spinner} alt="icone de chargement" className="mx-auto mt-20" />
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "https://via.placeholder.com/300x450" // Placeholder si aucune image disponible
          }
          alt={actor.name}
          className="w-full md:w-1/4 rounded-lg shadow-lg mb-4 md:mb-0  hover:shadow-2xl"
        />
        <div className="md:ml-6 flex flex-col justify-between">
          <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>
          <p
            className="text-lg mb-4 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 7,
              WebkitBoxOrient: "vertical",
            }}
          >
            {actor.biography || "Biographie indisponible."}
          </p>

          <div className="flex flex-col sm:flex-row justify-between">
            <p className={`mb-2 sm:mb-0 ${!actor.biography ? "mt-4" : ""}`}>
              <strong>Date de naissance :</strong> {actor.birthday || "N/A"}
            </p>
            <p
              className={`mb-2 sm:mb-0 ${!actor.biography ? "mt-4 ml-7" : ""}`}
            >
              <strong>Lieu de naissance :</strong>{" "}
              {actor.place_of_birth || "N/A"}
            </p>
          </div>
          <div className="mt-6">
            <ButtonHome />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Célèbre pour</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-lg cursor-pointer"
            >
              <MoviesCard
                movie={movie}
                dataBaseFavorite={dataBaseFavorite}
                setDataBaseFavorite={setDataBaseFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActorPresentation;