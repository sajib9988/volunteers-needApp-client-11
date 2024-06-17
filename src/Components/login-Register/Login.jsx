import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";


import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import Navbar from "../Navbar";

const Login = () => {
    const { signIn, signInWithGoogle, user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);

        try {
            const result = await signIn(email, password);
            console.log(result.user);
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email: result.user.email },
                { withCredentials: true }
            );
            console.log(data);
            toast.success('Signin Successful');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            console.log(result.user);
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email: result.user.email },
                { withCredentials: true }
            );
            console.log(data);
            toast.success('Signin Successful');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error during Google Sign-In: ", error);
            toast.error(error?.message);
        }
    };

    if (user || loading) return null;

    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <iframe
                        src="https://lottie.host/embed/b23c9409-cfc8-4fe3-8964-3f48be3debb2/ZwUuUorMBo.json"
                        className="w-full h-64 lg:h-full"
                        style={{ border: 'none' }}
                        title="Lottie Animation"
                    ></iframe>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl my-10 text-center">Please Login</h2>
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-secondary w-3/4 md:w-1/2 mb-4"
                    >
                        Sign in with Google
                    </button>
                    <form onSubmit={handleLogin} className="w-3/4 md:w-1/2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" required name="password" placeholder="Password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Do not have an account? <Link className="text-blue-600 font-bold" to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
