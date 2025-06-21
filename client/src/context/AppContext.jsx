import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Set base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Admin Check
  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        toast.error("You are not authorised to access admin dashboard");
        navigate("/");
      }
    } catch (error) {
      console.error("Admin check failed:", error);
    }
  };

  // ✅ Show Fetcher
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message || "Failed to fetch shows");
      }
    } catch (error) {
      console.error("Show fetch error:", error);
    }
  };

  // ✅ Favorites Fetcher
  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message || "Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Favorite fetch error:", error);
    }
  };

  // Fetch shows on first render
  useEffect(() => {
    fetchShows();
  }, []);

  // Re-check admin/favorites when user changes
  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  // ✅ Context value
  const value = {
    axios,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favoriteMovies,
    fetchIsAdmin,
    fetchFavoriteMovies,
    image_base_url,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
