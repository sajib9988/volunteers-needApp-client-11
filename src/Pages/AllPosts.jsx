import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://assignment-11-server-side-navy.vercel.app/posts"
      ); // Adjust endpoint as per your API
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch all posts initially
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500, // Customize the duration
    });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
              data-aos="flip-left" 
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="mt-4 flex-grow">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="mt-2 text-gray-600 font-bold">
                  {post.description}
                </p>
                <p className="mt-2">
                  Category:{" "}
                  <span className="font-medium text-black">
                    {post.category}
                  </span>
                </p>
                <p className="mt-2">
                  Location:{" "}
                  <span className="font-medium text-black">
                    {post.location}
                  </span>
                </p>
              </div>
              <Link
                to={`/detailsPage/${post._id}`}
                className="mt-4 text-center  font-bold bg-black p-2 text-white rounded-lg hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
