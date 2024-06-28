import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast from react-hot-toast

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        ` https://assignment-11-server-side-navy.vercel.app/my-posts?email=${user?.email}`,{withCredentials:true}
      );
      setMyPosts(response.data);
      // console.log("Fetched posts:", response.data);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyPosts();
    }
  }, [user]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        ` https://assignment-11-server-side-navy.vercel.app/posts/${postId}`
      );
      setMyPosts(myPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully"); // Show success toast
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post"); // Show error toast
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {myPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.postTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {post.postTitle}
                    </h3>
                    <p className="mb-2">{post.description}</p>
                    <p className="mb-2">
                      <strong>Category:</strong> {post.category}
                    </p>
                    <p className="mb-4">
                      <strong>Location:</strong> {post.location}
                    </p>
                    <div className="flex justify-between">
                      <Link to={`/update/${post._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded">
                          Update
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
