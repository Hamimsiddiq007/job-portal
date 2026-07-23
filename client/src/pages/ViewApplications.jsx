import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";


const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false)

  const fetchJobApplications = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/company/job-applicants', {headers: {token: companyToken}});

      if(data.success){
        setApplicants(data.applications.reverse());
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeApplicationStatus = async (id, status) => {
    try {
    const {data} = await axios.post(backendUrl + '/api/company/change-status', {id, status}, {headers: {token: companyToken}});

    if(data.success){
      fetchJobApplications()
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken){
      fetchJobApplications();
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ? (<div></div>) : (
    <div className="container mx-auto p-4">
      <div className="">
        <table className="w-full max-w-4xl bg-white border border-gray-300 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicant.userId.image}
                    alt=""
                  />
                  <span>{applicant.userId.name}</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                  {applicant.jobId.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                  {applicant.jobId.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <a
                    href={applicant.userId.resume}
                    target="_blank"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button cursor-pointer">...</button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                      <button onClick={() => changeApplicationStatus(applicant._id, 'Accepted')} className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer">
                        Accept
                      </button>
                      <button onClick={() => changeApplicationStatus(applicant._id, 'Rejected')} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
};

export default ViewApplications;
