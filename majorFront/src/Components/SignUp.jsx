import React, { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import authService from '../appwrite/auth';
import { useDispatch } from "react-redux";
// import { userLogin, userLogout } from "../appwrite/authentication";
// import { login as authLogin } from "../Context/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import {login as LoggIn} from "../Context/backendapi"
import search from '../Components/assets/search.png'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [toggleicon, setToggleicon] = useState(false);
    const toggle = () => {
        // alert("clicked")
        setToggleicon((prev) => !prev);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
          console.log("Credential response ", credentialResponse);
          navigate("/");
          dispatch(LoggIn());
        },
        onError: () => {
          console.log("Error");
        },
        flow: 'implicit', // or 'auth-code' if you're using backend token exchange
      });

    const login = async (data) => {
        try {
            const response = true;
            // const response = await userLogin(data);
            // const response= await axios.post("http://localhost:8000/api/v1/users/login", data,{
            //     withCredentials: true
            //   })
            //     console.log("Successfully logged in ",response.data.data?.user)
            if (response) {
                dispatch(LoggIn());
                navigate("/");
            }
        } catch (error) {
            console.log("Login error :: ", error);
        }
    };

    return (
        <div className="w-full bg-green-100 mt-20 flex justify-center select-none">
            <div className="bg-white w-1/3 flex flex-col items-start text-center mt-20 mb-20 p-10 space-y-6 shadow-2xl rounded-xl">
                <h1 className="text-2xl font-bold text-center w-full "> Create an account</h1>
                <div
                onClick={googleLogin}
                 className="flex items-center justify-center gap-2 w-full py-3 font-semibold border-1 border-neutral-300 rounded-lg hover:scale-105 transition-all duration-100">
                 <img src={search} className="size-6"></img>
                 <p>
                 Continue with Google
                </p>   
                </div>
                <div className="flex items-center text-gray-500  gap-4 w-full">
                <hr className="flex-grow border-t border-gray-400" />
                <p className="whitespace-nowrap">or continue with email</p>
                <hr className="flex-grow border-t border-gray-400" />
                </div>


                <form
                    onSubmit={handleSubmit(login)}
                    className=" space-y-6 w-full"
                >
                    <Input
                        label="Name "
                        type="text"
                        className="mt-1 border-1 border-gray-400 w-full p-3 rounded-lg"
                        placeholder="Your name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email "
                        type="email"
                        className="mt-1 border-1 border-gray-400 w-full p-3 rounded-lg"
                        placeholder="your@email.com"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                        value
                                    ) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <div className="relative">
                        <Input
                            id="password"
                            label="Password "
                            type={toggleicon ? "text" : "password"}
                            className="mt-1 border-1 border-gray-400 w-full p-3 rounded-lg "
                            placeholder="Your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {toggleicon ? (
                            <AiOutlineEye
                                onClick={() => toggle()}
                                className="absolute size-6 top-8 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700"
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                onClick={() => toggle()}
                                className="absolute size-6 top-8  right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700"
                            />
                        )}
                    </div>

                    <button className="w-full py-2 text-xl bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white cursor-pointer">
                        Sign Up
                    </button>
                </form>
                <p >
                    Already have an account?{" "}
                    <Link to="/login">
                        <span className="text-emerald-600">Login</span>
                    </Link>
                </p>
              
            </div>
        </div>
    );
}

export default Login;

{
    /* <div>
<form onSubmit={handleSubmittion()}>
<Input 
label='Email: '
type="email"
placeholder='Enter email'
{...register("email", {
    required: true,
    validate: {
        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Email address must be a valid address",
    }
})}
/>
<Input
label='Password: '
type='text'
placeholder='Enter password'
{...register('password',{
    required:true
})}
/>
</form> */
}
