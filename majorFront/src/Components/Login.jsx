import React, { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import authService from '../appwrite/auth';
import { useDispatch } from "react-redux";
// import { userLogin, userLogout } from "../appwrite/authentication";
// import { login as authLogin } from "../Context/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import {login as LoggIn} from "../Context/backendapi"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [toggleicon, setToggleicon] = useState(false);
    const toggle = () => {
        setToggleicon((prev) => !prev);
    };

    const login = async (data) => {
        try {
            const response = await userLogin(data);
            // const response= await axios.post("http://localhost:8000/api/v1/users/login", data,{
            //     withCredentials: true
            //   })
            //     console.log("Successfully logged in ",response.data.data?.user)
            if (response) {
                dispatch(authLogin());
                navigate("/");
            }
        } catch (error) {
            console.log("Login error :: ", error);
        }
    };

    return (
        <div className="w-screen bg-fuchsia-100 flex justify-center select-none">
            <div className="bg-white w-1/3 flex flex-col items-start mt-20 mb-20 p-10 space-y-6 border rounded-xl">
                <h1 className="text-4xl "> Log In</h1>
                <form
                    onSubmit={handleSubmit(login)}
                    className=" space-y-6 w-full"
                >
                    <Input
                        label="Email "
                        type="email"
                        className="mt-1 border-2 w-full p-3 rounded-xl"
                        placeholder="Enter email"
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
                            className="mt-1 border-2 w-full p-3 rounded-xl "
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {toggleicon === "visible" ? (
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

                    <button className="w-full py-4 bg-red-500 rounded-xl text-white cursor-pointer">
                        Login
                    </button>
                </form>
                <p >
                    Don't have an account?{" "}
                    <Link to="/signup">
                        <span className="text-red-500">Signup</span>
                    </Link>
                </p>
                <GoogleLogin 
                onSuccess={
                    (credentialResponse)=>{
                        console.log("Credential response ",credentialResponse)
                        navigate("/")
                        dispatch(LoggIn())
                    }

                }

                onError={
                    console.log("Error")
                }
                auto_select={true}
                />
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
