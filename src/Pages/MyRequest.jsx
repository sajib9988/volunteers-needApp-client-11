import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from './../AuthProvider/AuthProvider';

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://assignment-11-server-side-navy.vercel.app/myRequest/${user?.email}`);
        setRequests(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching organizer requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`https://assignment-11-server-side-navy.vercel.app/myRequest/${id}/approve`);
      toast.success('Request approved successfully');
      updateRequestStatus(id, 'Approved');
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`https://assignment-11-server-side-navy.vercel.app/myRequest/${id}/reject`);
      toast.success('Request rejected successfully');
      updateRequestStatus(id, 'Rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
    }
  };

  const updateRequestStatus = (id, status) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request._id === id ? { ...request, status } : request
      )
    );
  };

  if (isLoading) return <p>Data is still loading...</p>;

  return (
    <section className='mx-auto container ' >
      <h1 className='text-center font-bold  ' >Organizer Requests ({requests.length} Requests)</h1>
      <div className='flex flex-col mt-6 mx-auto container'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider'>Volunteer Name</th>
                    <th className='px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider'>Category</th>
                    <th className='px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider'>Status</th>
                    <th className='px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{request.email}</td>
                      <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>{request.category}</td>
                      <td className='px-4 py-4 whitespace-nowrap text-sm font-medium'>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className='px-4 py-4 whitespace-nowrap text-sm font-medium'>
                        {request.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request._id)}
                              className='text-white p-1 bg-green-800 font-bold rounded-lg w-[70px] hover:text-indigo-900'
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request._id)}
                              className='ml-2 p-1 py-1 text-white rounded-lg font-bold bg-red-700 w-[60px] hover:text-red-900'
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyRequests;
