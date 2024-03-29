

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../redux/feature/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { IUser } from "../types";


function Login() {
    const { register, handleSubmit } = useForm<IUser>();
    const [loginUser, { isLoading, isError, error, isSuccess, }] =
        useLoginUserMutation();
    const [authLoading, setAuthLoading] = useState(false);
    const { user } = useAppSelector(state => state.userState)



    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';



    const handelLogin = async (payload: IUser): Promise<void> => {

        setAuthLoading(true);
        try {
            const { data: res } = await loginUser(payload) as { data: any };
    
            // Use optional chaining to safely access the 'data' property
            const cookie = res?.data?.refreshToken;
            
            if (cookie) {
                console.log(cookie,"checking");
                Cookies.set("refreshToken", cookie, { expires: 365 });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => {

        if (isSuccess && !isLoading) {
            toast.success('You successfully logged in');
            console.log(Cookies.get('refreshToken'), "cheki");

            navigate(from);

            // Reload the page after successful login
            window.location.reload();
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="flex  h-screen items-center justify-center bg-gray-100 py-10">
            
            <form
                onSubmit={handleSubmit(handelLogin)}
                className="mx-6 flex w-full flex-col space-y-6 rounded-lg border bg-white px-7 py-10 shadow-lg lg:w-2/5"
            >
                {/* logo */}
                <div className="mx-auto w-44">
                    <img className="mx-auto" src={logo} alt="logo" />
                </div>

                <div className="bg-gray-200 rounded-lg p-3 mb-6">
              <p className="font-semibold">Default Login Credentials:</p>
              <p>Email: admin@admin.com</p>
              <p>Password: 123456</p>
            </div>

                {authLoading && (
                    <div>
                        <p>Loading...</p>
                    </div>
                )}

                <>
                    <input
                        className="rounded-lg border-gray-300 pl-3  py-4 text-sm shadow transition hover:shadow-lg"
                        type="email"
                        required
                        placeholder="Email"
                        {...register("email")}
                    />
                    <input
                        className="rounded-lg border-gray-300 pl-3 py-4  text-sm shadow transition hover:shadow-lg"
                        type="password"
                        required
                        placeholder="Password"
                        {...register("password")}
                    />

                    <button className="bg-blue-800 p-3 rounded-sm text-white font-bold" type="submit">
                        Login
                    </button>
                </>

                {/* already registered */}
                {/* {!verify.success && (
                        <p className="text-center text-sm font-semibold">
                            Already have an account ?{" "}
                            <Link href="/login">
                                <a className="text-blue-500">Login</a>
                            </Link>
                        </p>
                    )} */}
                <p className="text-center text-lg font-semibold">
                    Not a user?{" "}
                    <Link to="/signup">
                        <a className="text-blue-500">Signup</a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Login;

