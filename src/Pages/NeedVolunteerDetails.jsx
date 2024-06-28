import { VscChromeClose } from 'react-icons/vsc'; // Make sure to import the icon
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from 'react-modal';
import { AuthContext } from '../AuthProvider/AuthProvider';

// Set app element for modal accessibility
Modal.setAppElement('#root'); // Adjust as per your app root element ID

const NeedVolunteerDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const need = useLoaderData();

  // Destructure properties from the `need` object
  const {
    _id,                // Unique identifier for the volunteer post
    postTitle,          // Title of the volunteer post
    description,        // Description of the volunteer post
    location,           // Location where volunteers are needed
    volunteersNeeded,   // Number of volunteers needed
    deadline,           // Deadline to apply for volunteering
    category,           // Category of the volunteer post (e.g., Healthcare)
    organizer,          // Organizer details (name and email are nested within this object)
    thumbnail,          // URL of the thumbnail image for the post
  } = need;
  const { 
    name: organizerName, // Organizer's name
    email: organizerEmail // Organizer's email
  } = organizer;

  const [startDate, setStartDate] = useState(new Date(deadline));
  const [formValues, setFormValues] = useState({
    email: '',
    comment: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        email: user.email,
      }));
    }
  }, [user]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error('Please log in to volunteer.');
    }

    if (user.email === organizerEmail) {
      return toast.error('Organizers cannot volunteer for their own posts.');
    }

    const formData = {
      postId: _id,
      comment: formValues.comment,
      email: user.email,
      status: 'Pending',
      deadline: startDate,
      postTitle,
      category,
      organizer_email: organizerEmail,
      organizer_name: organizerName,
    };

    try {
      await axios.post(' https://assignment-11-server-side-navy.vercel.app/volunteer-request', formData);
      toast.success('Volunteer Request Sent Successfully!');
      closeModal();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Error sending volunteer request.');
    }
  };

  return (
    <div className='flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] mt-3 md:max-w-screen-xl mx-auto'>
      <div className='flex-1 px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-bold bg-green-500 text-gray-800 p-2 rounded-lg'>
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className='px-4 py-1 text-sm font-bold text-white uppercase bg-blue-500 rounded-full'>
            {category}
          </span>
        </div>
        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800'>{postTitle}</h1>
          <p className='mt-2 text-lg text-gray-600'>{description}</p>
          <p className='mt-2 text-lg text-gray-600'>Location: {location}</p>
          <p className='mt-2 text-lg text-gray-600'>Volunteers Needed: {volunteersNeeded}</p>
          <p className='mt-6 text-sm font-bold text-gray-600'>Organizer Details:</p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm text-gray-600'>Name: {organizerName}</p>
              <p className='mt-2 text-sm text-gray-600'>Email: {organizerEmail}</p>
            </div>
          </div>
        </div>
        <img src={thumbnail} alt={postTitle} className='mt-4 h-[400px] w-full rounded-md' />

        <div className='mt-4'>
          <button
            onClick={openModal}
            className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          >
            Be a Volunteer
          </button>
        </div>

        {/* Modal for volunteer request */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
            },
          }}
          contentLabel='Volunteer Request Modal'
        >
          <div className='flex justify-between items-center mb-4 w-[450px]'>
            <h2 className='text-2xl font-bold'>{postTitle}</h2>
            <button onClick={closeModal} className='text-gray-600 border w-[28px] h-[28px] rounded-full flex justify-center items-center hover:text-gray-800'>
              <VscChromeClose />
            </button>
          </div>
          <form onSubmit={handleFormSubmission}>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='email'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                name='email'
                defaultValue={user.email}
                readOnly
                className='block w-full px-3 py-2 mt-1 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700' htmlFor='comment'>
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                id='comment'
                name='comment'
                value={formValues.comment}
                onChange={handleInputChange}
                required
                className='block w-full px-3 py-2 mt-1 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                rows='4'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Deadline</label>
              <DatePicker
                className='block w-full px-3 py-2 mt-1 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                readOnly
              />
            </div>
            <div className='flex justify-end'>
              <button
                type='submit'
                className='px-4 py-2 bg-green-300 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
              >
                Request Volunteer
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default NeedVolunteerDetails;
