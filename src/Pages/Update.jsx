import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Update = () => {
  const updatePost = useLoaderData(); // Correct usage of the hook
  const navigate = useNavigate();

  // Function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedItem = {
      postTitle: form.postTitle.value,
      description: form.description.value,
      location: form.location.value,
      volunteersNeeded: form.volunteersNeeded.value,
      deadline: form.deadline.value,
      category: form.category.value,
      thumbnail: form.thumbnail.value,
      organizer: {
        name: form.organizerName.value,
        email: form.organizerEmail.value // Added organizer email field
      }
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/update/${updatePost._id}`,
        updatedItem
      );
      if (response.status === 200) {
        toast.success("Post updated successfully!");
        navigate("/my-posts");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("There was an error updating the post.");
    }
  };

  return (
    <div className="container mx-auto w-[700px] p-4 b border mt-4">
      <h1 className="text-2xl text-center text-red-600  font-bold mb-4">Update your Post</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postTitle">
            Post Title
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            defaultValue={updatePost.postTitle}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={updatePost.description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={updatePost.location}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volunteersNeeded">
            Volunteers Needed
          </label>
          <input
            type="number"
            id="volunteersNeeded"
            name="volunteersNeeded"
            defaultValue={updatePost.volunteersNeeded}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            defaultValue={formatDate(updatePost.deadline)} // Use formatDate function here
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={updatePost.category}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizerName">
            Organizer Name
          </label>
          <input
            type="text"
            id="organizerName"
            name="organizerName"
            defaultValue={updatePost.organizer.name} // Assuming organizer name is directly from input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizerEmail">
            Organizer Email
          </label>
          <input
            type="email"
            id="organizerEmail"
            name="organizerEmail"
            defaultValue={updatePost.organizer.email} // Assuming organizer email is directly from input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            defaultValue={updatePost.thumbnail}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center mt-2 ">
          <button
            type="submit"
            className="bg-black  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
