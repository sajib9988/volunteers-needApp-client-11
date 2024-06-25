import { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const AddVolunteerPost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [formError, setFormError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const thumbnail = form.thumbnail.value;
    const postTitle = form.post_title.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = form.volunteers_needed.value;
    const deadline = startDate;
    const organizer = {
      name: user?.displayName,
      email: user?.email,
    };

    if (!postTitle || !description || !category || !location || !volunteersNeeded) {
      setFormError('All fields are required');
      return;
    }

    const volunteerPostData = {
      thumbnail,
      postTitle,
      description,
      category,
      location,
      volunteersNeeded: parseInt(volunteersNeeded),
      deadline,
      organizer,
    };

    try {
      const  data  = await axios.post('http://localhost:5000/addVolunteers', volunteerPostData);
      console.log(data);
      toast.success('Volunteer Post Added Successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Error adding volunteer post.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] mx-auto container my-12'>
      <section className='p-2 md:p-6 mx-auto bg-white rounded-md shadow-md'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize'>Post a Need for Volunteers</h2>
        <form onSubmit={handleFormSubmit}>
          {formError && <p className='text-red-500'>{formError}</p>}
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 shadow-lg border p-4'>
            <div>
              <label className='text-gray-700' htmlFor='thumbnail'>
                Thumbnail
              </label>
              <input
                id='thumbnail'
                name='thumbnail'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700' htmlFor='post_title'>
                Post Title
              </label>
              <input
                id='post_title'
                name='post_title'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700' htmlFor='description'>
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700'>Deadline</label>
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                className='border p-2 rounded-md'
              >
                <option value='Healthcare'>Healthcare</option>
                <option value='Education'>Education</option>
                <option value='Social Service'>Social Service</option>
                <option value='Animal Welfare'>Animal Welfare</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700' htmlFor='location'>
                Location
              </label>
              <input
                id='location'
                name='location'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700' htmlFor='volunteers_needed'>
                No. of Volunteers Needed
              </label>
              <input
                id='volunteers_needed'
                name='volunteers_needed'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
            <div>
              <label className='text-gray-700' htmlFor='organizer_email'>
                Organizer Email
              </label>
              <input
                id='organizer_email'
                type='email'
                name='organizer_email'
                disabled
                defaultValue={user?.email}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button type='submit' className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Add Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddVolunteerPost;
