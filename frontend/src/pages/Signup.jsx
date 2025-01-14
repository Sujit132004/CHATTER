import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignUp from '../hooks/useSignUp';

const Signup = () => {
  const [inputs,setInputs]=useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  });

  const {loading,signup}=useSignUp();

  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender:gender});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await signup(inputs);


    console.log(inputs);
  }
  return (
    <div className='flex flex-col items-cente justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <div className='flex items-center justify-center  gap-1'>
          
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Signup
            <span className='text-blue-500 '> Chatter </span>
          </h1>
          <span className="loading loading-dots loading-lg mt-1"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text '>Full Name</span>
              </label>
              <input type='text' placeholder="Full Name" className='w-full input input-bordered h-10' 
                value={inputs.fullName}
                onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
              
              />
            </div>

            <div>
            <label className='label p-2'>
                <span className='text-base label-text '>User Name</span>
              </label>
              <input
                value={inputs.username}
                onChange={(e)=>setInputs({...inputs,username:e.target.value})}
              
              type='text' placeholder="User Name" className='w-full input input-bordered h-10' />
            </div>

            <div>
            <label className='label p-2'>
                <span className='text-base label-text '>Password</span>
              </label>
              <input 
                 
                 value={inputs.password}
                 onChange={(e)=>setInputs({...inputs,password:e.target.value})}
              
              type='password' placeholder="Password" className='w-full input input-bordered h-10' />
            </div>

            <div>
            <label className='label p-2'>
                <span className='text-base label-text '>Confirm Password</span>
              </label>
              <input 
                value={inputs.confirmPassword}
                onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
              type='password' placeholder="Confirm Password" className='w-full input input-bordered h-10' />
            </div>


            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <Link to={'/login'} className="text-sm text-gray-600 hover:underline hover:text-blue-600  inline-block">{"Already have an account?"}</Link>

            <div>
              <button  className='btn btn-block btn-sm mt-2 border border-slate-700 '
                disabled={loading}>

                { loading ? <span className='loading loading-spinner'></span>: "Signup"}
              
              </button>
            </div>

          </form>
      </div>
    </div>
  )
}

export default Signup