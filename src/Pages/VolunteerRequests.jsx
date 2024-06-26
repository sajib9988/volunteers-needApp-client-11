import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const VolunteerRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/volunteer-requests/${user?.email}`,{withCredentials:true} );
        setRequests(response.data);
        console.log('volunteer data', response.data);
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

  if (isLoading) return <p>Data is still loading...</p>;

  return (
    <section className="mx-auto container mb-3">
      <h1 className="text-center font-bold mb-6">Volunteer Requests</h1>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Volunteer email</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{request.category}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                        }`}>
                          {request.status}
                        </span>
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

export default VolunteerRequests;
