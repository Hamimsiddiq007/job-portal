import { useNavigate } from "react-router-dom"
import { manageJobsData } from "../assets/assets"
import moment from "moment"


const ManageJobs = () => {

  const navigate = useNavigate();

  return (
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
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{index + 1}</td>
                <td className="px-4 py-2 border-b border-gray-300">{job.title}</td>
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{moment(job.date).format('ll')}</td>
                <td className="px-4 py-2 border-b border-gray-300 max-sm:hidden">{job.location}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">{job.applicants}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <input className="scale-125 ml-4" type="checkbox" />
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
  )
}

export default ManageJobs
