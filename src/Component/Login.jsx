
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate()
    const [logindata, setLoginData] = useState({
        email: '',
        password: '',
      });
      const handleLogin=async()=>{
        console.log("calledddd");
        console.log(logindata.email);
        console.log(logindata.password);
        const res = await axios.post('http://localhost:3000/login', { ...logindata });
        console.log("front end bscc",res.data);
        const {token}= res.data
        console.log(token);
        localStorage.setItem('user',JSON.stringify({token,user:res.data}))
        if(res.data.exist){
          navigate('/')
        }
      }
      useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
          navigate('/')
        }
      }, [])
      const navToSignup=()=>{
        navigate('/signup')
      }
    return (
        <div>
    <div className="w-full h-screen  flex ">
        <div className="w-1/2 h-full  flex justify-center items-center p-2">
          <div className="w-full h-full  flex flex-col gap-2 p-2">
            <div className="w-full h-32  flex justify-center items-end">
              <section className="w-[285px] h-14   flex items-end justify-start">
                <h1 className="text-xl text-[#7886a1] font-serif font-bold text-center">
                   Login 
                </h1>
              </section>
            </div>
            <div className=" w-full h-96  p-2">
              <div className="w-full h-full  flex justify-center ">
                <div className="w-72">
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="email"
                      onChange={(e)=>setLoginData({...logindata,[e.target.name]:e.target.value})}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Email
                    </label>
                  </div>
                  <div className="relative mt-5 h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-[#7886a1] bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7886a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      name="password"
                      onChange={(e)=>setLoginData({...logindata,[e.target.name]:e.target.value})}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#7886a1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7886a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#7886a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#7886a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#7886a1]">
                      Password
                    </label>
                  </div>
                  <div className="w-full h-14  flex justify-center items-center mt-3">
                    <button onClick={handleLogin}
                    className="w-full h-10 text-white bg-[#6d42d8] rounded-lg shadow-lg" >LogIn</button>
                  
                  </div>
                  <h1 onClick={navToSignup} className='text-white'>SignUp</h1>
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
    </div>
  )
}

export default Login













        // import React from 'react'
        // import './Login.css'
        // function Login() {
        //   return (
        //     <div>
        //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
        //       <form className="form card">
        //         <div className="card_header">
        //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        //             <path fill="none" d="M0 0h24v24H0z"></path>
        //             <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
        //           </svg>
        //           <h1 className="form_heading">Log in</h1>
        //         </div>
        //         <div className="field">
        //           <label for="username">Username</label>
        //           <input className="input" name="username" type="text" placeholder="Username" id="username" 
        //         //   onChange={(e)=>{setUsername(e.target.value)}} 
        //           />
        //         </div>
        //         <div className="field">
        //           <label for="password">Password</label>
        //           <input className="input" name="password" type="password" placeholder="Password" id="password"
        //             // onChange={(e)=>{setPassword(e.target.value)}}
        //              />
        //         </div>
        //         <div className="field">
        //           <button type='submit' className="button">Login</button>
        //         </div>
        //         <p className='navSign'>Signup</p>
        //       </form>
        
        
        //     </div>
        //     </div>
        //   )
        // }
        
        // export default Login
        
        
        
        
