import { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJobs = () => {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const {backendUrl, companyToken} = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const {data} = await axios.post(backendUrl + '/api/company/post-job', {
        title,
        description,
        location,
        category,
        level,
        salary
      }, {headers: {token: companyToken}});

      if(data.success) {
        toast.success("Job posted successfully");
        setTitle('');
        setSalary(0);
        quillRef.current.root.innerHTML = '';
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: { toolbar: true },
      });
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className="w-full">
        <p className='mb-2'>Job Title</p>
        <input type="text" placeholder='Type here' onChange={e => setTitle(e.target.value)} value={title} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
      </div>

      <div className="w-full max-w-lg">
        <p className='my-2'>Job Description</p>
        <div ref={editorRef} className="">

        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-8">
        <div className="">
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="">
          <p className='mb-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="">
          <p className='mb-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div className="">
        <p className='mb-2'>Salary</p>
        <input min={0} value={salary} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-30' onChange={e => setSalary(e.target.value)} type="Number" placeholder='Type salary' />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
  )
}

export default AddJobs
