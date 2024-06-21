import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      setIsLoading(true);
      try {
        // Use user.organizer.email if that's where the email is nested
        const response = await axios.get(`https://assignment-11-server-side-navy.vercel.app/my-posts?email=${user?.email}`);
        setMyPosts(response.data);
        console.log("Fetched posts:", response.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchMyPosts();
    }
  }, [user]);

  const handleUpdatePost = (postId) => {
       axios.update()
    console.log("Update post with id:", postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`https://assignment-11-server-side-navy.vercel.app/posts/${postId}`);
      setMyPosts(myPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>My Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {myPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <ul>
              {myPosts.map((post) => (
                <li key={post._id}>
                  <h3>{post.postTitle}</h3>
                  <p>{post.description}</p>
                  <p>Category: {post.category}</p>
                  <p>Location: {post.location}</p>
                  <button onClick={() => handleUpdatePost(post._id)}>Update</button>
                  <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
