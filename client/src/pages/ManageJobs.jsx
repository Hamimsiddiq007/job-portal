import { useNavigate } from "react-router-dom";
import moment from "moment"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";


const ManageJobs = () => {

  const navigate = useNavigate();

  const [job, setJob] = useState(false)

  const {backendUrl, companyToken} = useContext(AppContext);

  const fetchJobs = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/company/list-jobs', {headers: {token: companyToken}});

      if(data.success) {
        setJob(data.jobsData.reverse());
        console.log(data.jobsData);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const changeJobVisibility = async (id) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/company/change-visibility', {id}, {headers: {token: companyToken}});

      if(data.success){
        toast.success("Job visibility changed");
        fetchJobs();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    if(companyToken){
      fetchJobs();
    }
  }, [companyToken])

  return job ? job.length === 0 ? (<div></div>) : (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 max-sm:text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left max-sm:hidden">#</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Job Title</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left max-sm:hidden">Date</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left max-sm:hidden">Location</th>
              <th className="px-4 py-2 border-b border-gray-300 text-center">Applicants</th>
              <th className="px-4 py-2 border-b border-gray-300 text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {job.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{index + 1}</td>
                <td className="px-4 py-2 border-b border-gray-300">{job.title}</td>
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{moment(job.date).format('ll')}</td>
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{job.location}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">{job.applicants}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <input onChange={() => changeJobVisibility(job._id)} className="scale-125 ml-4" type="checkbox" checked = {job.isVisible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={() => navigate('/dashboard/add-jobs')} className="bg-black text-white px-4 py-2 rounded">Add new job</button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs
