import React,{useState,useEffect} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const Url = import.meta.env.VITE_BASEURL;
  const navigate=useNavigate()
    const [signupdata, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
      const handleSignup =async()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupdata.email)) {
      toast.error("Invalid email format", { position: 'top-center', autoClose: 3000 });
      return; 
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(signupdata.phone)) {
      toast.error("Invalid phone number", { position: 'top-center', autoClose: 3000 });
      return; 
    }
    
        if (!signupdata.name || !signupdata.email || !signupdata.phone || !signupdata.password) {
          toast.error("All fields are required", { position: 'top-center', autoClose: 3000 });
          return; 
        }

        const response=await axios.post(`${Url}/register`,{...signupdata})
        console.log("reached",response.data);
        if(response.data.created===false){
          toast.error(response.data.status, { position: 'top-center', autoClose: 3000 });
        }else{
        const {token}= response.data
        console.log("destru",token);
        localStorage.setItem('user',JSON.stringify({token,user:response.data}))
        if(response.data.created){
          navigate('/')
        }
      }
      }
      useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
          navigate('/')
        }
      }, [])
      const navToLogin=()=>{
        navigate('/login')
      }
  return (
    <div>
    <div className="w-full h-screen  flex ">
        <div className="w-1/2 h-full  flex justify-center items-center p-2">
          <div className="w-full h-full  flex flex-col gap-2 p-2">
            <div className="w-full h-32  flex justify-center items-end">
              <section className="w-[285px] h-14   flex items-end justify-start">
                <h1 className="text-xl text-[#7886a1] font-serif font-bold text-center">
                  SignUp
                </h1>
              </section>
            </div>
            <div className="w-full h-96  p-2">
              <div className="w-full h-full  flex justify-center items-center ">
                <div className="w-72">
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="name"
                      type='text'
                      onChange={(e)=>setSignupData({...signupdata,[e.target.name]:e.target.value})}

                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Name
                    </label>
                  </div>
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="email"
                      type='email'
                      onChange={(e)=>setSignupData({...signupdata,[e.target.name]:e.target.value})}

                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Email
                    </label>
                  </div>
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="phone"
                      type="number"
                      onChange={(e)=>setSignupData({...signupdata,[e.target.name]:e.target.value})}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Phone
                    </label>
                  </div>
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="password"
                      type='text'
                      onChange={(e)=>setSignupData({...signupdata,[e.target.name]:e.target.value})}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Password
                    </label>
                  </div>
                 
                  <div className="w-full h-14  flex justify-center items-center mt-3">
                    <button onClick={handleSignup}
                    className="w-full h-10 text-white bg-[#6d42d8] rounded-lg shadow-lg">Signup</button>
                  </div>
                  <h1 onClick={navToLogin} className='text-white'>Login</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full  pt-5 px-6 mt-3 flex">
            <div className="w-full h-full bg-[#364761] rounded-t-2xl flex justify-center items-center">
                <div>
                <div className="w-full h-72  flex justify-center items-center">
                    <img className=" h-full object-cover rounded-md" src="https://www.lifewire.com/thmb/WZdlwJIGSRA9Bkk7tKIj9Mgg-lk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/xxl-desktop-pc-98013994-5c4dcc47c9e77c0001380389.jpg" alt="no Image Founded" />
                </div>
                 <h1 className="text-xl font-serif font-semibold text-[#7886a1] text-center">Join Us & Explore Thousands </h1>
                 <h1 className="text-xl font-serif font-semibold text-[#7886a1] text-center"> Of Greate Opportonuties </h1>
                </div>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
