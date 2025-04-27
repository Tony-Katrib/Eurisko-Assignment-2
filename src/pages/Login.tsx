import { useState } from 'react';
import Button from '../components/Button';
import useAuth from '../store/useAuth'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/lottie/login-btn-loader.json';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Fill required fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.result?.data?.accessToken) {
                const { setAuth } = useAuth.getState()
                setAuth(data.result.data.accessToken, data.result.data.expiresIn)
                navigate('/dashboard')
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary px-base">
            <div className="bg-white p-lg rounded-md shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h2 className="text-heading font-semibold text-center mb-md">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-base">
                    <div>
                        <label className="block mb-xs text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block mb-xs text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-base top-1/2 -translate-y-1/2 text-sm text-gray-300"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ?
                                    <svg className="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-danger text-sm">{error}</p>}

                    <Button variant="primary">
                        {loading ?
                            (<div className="relative w-full h-full py-3 flex items-center justify-center">
                                <div className="absolute w-12 h-12 pointer-events-none">
                                <Lottie animationData={loadingAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>)
                            :
                            'Login'
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}