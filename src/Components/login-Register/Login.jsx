import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
    const { signInUser, signInWithGoogle, user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const handleGoogleSignIn = async () => {
        try {
            // 1. Google sign in from firebase
            const result = await signInWithGoogle();
            console.log(result.user);

            // 2. Get token from server using email
            const { data } = await axios.post(
                `http://localhost:5000/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            );
            console.log(data);
            toast.success('SignIn Successful');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };
// email signIn form firebase
    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.password.value;
        console.log({ email, pass });

        try {
            // User login
            const result = await signInUser(email, pass);
            console.log(result.user);

            // Get token from server using email
            const { data } = await axios.post(
                `http://localhost:5000/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            );
            console.log(data);
            toast.success('Signin Successful');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    if (user || loading) return null;

    return (
        <div>
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
                    <form onSubmit={handleSignIn} className="w-3/4 md:w-1/2">
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
