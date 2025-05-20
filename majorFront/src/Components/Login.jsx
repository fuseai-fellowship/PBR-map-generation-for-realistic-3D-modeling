import React, { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { login as LoggIn } from "../Context/backendapi";
import search from '../Components/assets/search.png';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [toggleicon, setToggleicon] = useState(false);
    const toggle = () => setToggleicon(prev => !prev);

    const googleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log("Credential response ", credentialResponse);
            navigate("/");
            dispatch(LoggIn());
        },
        onError: () => {
            console.log("Error");
        },
        flow: 'implicit',
    });

    const login = async (data) => {
        try {
            const response = true;
            if (response) {
                dispatch(LoggIn());
                navigate("/");
            }
        } catch (error) {
            console.log("Login error :: ", error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-green-100 flex justify-center items-center px-4 pt-20 select-none">
            <div className="bg-white w-full max-w-md flex flex-col items-start text-center p-8 space-y-6 shadow-2xl rounded-xl">
                <h1 className="text-2xl font-bold text-center w-full">Welcome Back</h1>

                <div
                    onClick={googleLogin}
                    className="flex items-center justify-center gap-2 w-full py-3 font-semibold border border-neutral-300 rounded-lg hover:scale-105 transition-all duration-100 cursor-pointer"
                >
                    <img src={search} className="size-6" alt="Google" />
                    <p>Continue with Google</p>
                </div>

                <div className="flex items-center text-gray-500 gap-4 w-full">
                    <hr className="flex-grow border-t border-gray-400" />
                    <p className="whitespace-nowrap text-sm">or continue with email</p>
                    <hr className="flex-grow border-t border-gray-400" />
                </div>

                <form onSubmit={handleSubmit(login)} className="space-y-6 w-full">
                    <Input
                        label="Email"
                        type="email"
                        className="mt-1 border border-gray-400 w-full p-3 rounded-lg"
                        placeholder="your@email.com"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Invalid email address",
                            },
                        })}
                    />
                    <div className="relative">
                        <Input
                            id="password"
                            label="Password"
                            type={toggleicon ? "text" : "password"}
                            className="mt-1 border border-gray-400 w-full p-3 rounded-lg"
                            placeholder="Your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {toggleicon ? (
                            <AiOutlineEye
                                onClick={toggle}
                                className="absolute size-6 top-8 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                onClick={toggle}
                                className="absolute size-6 top-8 right-5 transform translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            />
                        )}
                    </div>

                    <button className="w-full py-2 text-xl bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white">
                        Login
                    </button>
                </form>

                <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup">
                        <span className="text-emerald-600">Signup</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

