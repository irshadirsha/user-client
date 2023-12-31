import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const Url = import.meta.env.VITE_BASEURL;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const navigate=useNavigate()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState({
    image:""
  });
  const [userdata,setUserData]=useState([])
  const openImageModal=()=>{
    setIsImageModalOpen(true)
  }
 const closeImageModal=()=>{
  setIsImageModalOpen(false)
 }

 const fetchdata = async () => {
  const storedUserData = localStorage.getItem('user');
  console.log("from local storage", storedUserData);

  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    console.log("user email:", parsedUserData.user.data.email);
    const mail = parsedUserData.user.data.email;
    console.log(parsedUserData.token   );

    try {
      const response = await axios.get(`${Url}/getdata`, {
        params: { email: mail },
        headers: {
          Authorization: `Bearer ${parsedUserData.token}`,
        },
      });

      console.log(response.data);
      console.log(response.data.data);
      setUserData(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    console.log("Email not found in the 'userExist' property.");
  }
};

 useEffect(()=>{
  fetchdata()
 },[])
 const handleLogout=()=>{
    localStorage.removeItem('user')
    navigate('/login')
 }
 const handleImageUpdate = async (e) => {
  e.preventDefault();
  const storedUserData = localStorage.getItem('user');
  console.log("from local storage", storedUserData);

  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    console.log("user email:", parsedUserData.user.data.email);
    const mail = parsedUserData.user.data.email;
    console.log(parsedUserData.token   );
  const formData= new FormData();
  formData.append('file', selectedImage.image);
  formData.append('upload_preset', 'I-club')
  setIsImageModalOpen(false)
  console.log("formdataaa",formData)
  const  data = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
 console.log("back from cloudinary",data);
 console.log("back from cloudinary",data.data.secure_url);
 const url=data.data.secure_url
 const response = await axios.post(
  `${Url}/addimg`,
  { url },  
  {
    headers: {
      Authorization: `Bearer ${parsedUserData.token}`,
    },
  }
);
 console.log("response after image",response.data);
 fetchdata()
  }
 }

  return (
    <div className='bg-white h-screen'>
     <div className='bg-[#1f2d48] h-12 w-full flex justify-end items-center'>
  <button onClick={handleLogout}
  className='bg-white px-2 py-1 rounded-md'>LogOut</button>
</div>

      <div className="container mx-auto p-4">
      <div className="bg-[#1f2d48] md:mx-20 text-white p-8 rounded-t-lg flex flex-col sm:flex-row items-center">
        <div className="bg-white rounded-md mr-4 flex-shrink-0">
          <img
             src={userdata.image ? userdata.image : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
            alt="Profile"
            className="w-36 h-36 rounded-md object-cover object-top"
          />
        </div>

        <div className="flex flex-col mt-4 sm:mt-0">
          <h5 className="text-xl text-white font-bold">{userdata.name}</h5>
          <br />
          <button
              type="button"
              className="ml-5 btn btn-outline-dark text-lg font-mono border p-1 rounded bg-white text-black text-center mt-4"
              onClick={openImageModal}
              >
              edit image
            </button>
        </div>
      </div>

      {/* Add your about section here */}

      <div className="md:mx-40 p-2 text-black">
      { isImageModalOpen && (<div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-semibold text-gray-800">Upload Profile Image</h5>
     
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        accept="image/*"
       onChange={(e) => {
              const selectedFile = e.target.files[0];
              setSelectedImage({ ...selectedImage, image: selectedFile });
            }}
          />
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
        onClick={handleImageUpdate }
        // disabled={!selectedFile}
      >
        Upload
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
         onClick={closeImageModal}
      >
        Close
      </button>
    </div>
  </div>
</div>)}

        <div className="d-flex justify-between items-center mb-4">
          <p className="text-xl font-semibold mb-0">Account Deatails</p>
        </div>
        <div className="bg-[#1f2d48]m-6  rounded-md  ">  
          <div className="text-center md:py-6 flex-grow">
            <h1 className="text-lg text-black font-mono font-bold">Username:{userdata.name}</h1>
            <h1 className="text-lg text-black font-mono font-bold">Emal:{userdata.email}</h1>
            <h1 className="text-lg text-black font-mono font-bold">phone:{userdata.phone}</h1>
          </div> 
        </div>
      </div>
    </div>

    </div>
  )
}

export default Home


{/* <div className="d-flex justify-between items-center mb-4">
<p className="text-xl font-semibold mb-0">Account Deatails</p>
</div>
<div className="bg-[#1f2d48]m-6  rounded-md  ">  
<div className="text-center md:py-6 flex-grow">
  <h1 className="text-lg text-black font-mono font-bold">Username:{userdata.name}</h1>
  <h1 className="text-lg text-black font-mono font-bold">Emal:{userdata.email}</h1>
  <h1 className="text-lg text-black font-mono font-bold">phone:{userdata.phone}</h1>
</div> 
</div>
</div>
</div> */}
