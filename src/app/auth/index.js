import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message';
import { useUserState } from '../../container/state/store'
import instance from '../../container/services/dataprovider';

export default function Auth() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()
  const setUser = useUserState((state) => state.setUser)
  const setToken = useUserState((state) => state.setToken)
  const setRefreshToken = useUserState((state) => state.setRefreshToken)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await instance.post('/auth/signin', userData).then((response) => Promise.resolve(response))
      console.log(data)
      if (data.user) {
        setRefreshToken(data.refreshToken)
        setUser(data.user)
        setToken(data.accessToken)
        setLoading(false)
        navigate('/dashboard')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      if (error) {
        setError(error ? (error.response.data && error.response.data.message ? error.response.data.message : error.message) : '')
      }
    }
  };

  return (
    <div className="bg-gray-900 h-screen pt-9">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-900 mx-auto my-0">
        {error && <Message variant='warning'>{error}</Message>}
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-400">Sign in to access your account</p>
        </div>
        <form noValidate="" onSubmit={handleSubmit} action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" onChange={handleChange} name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-700  bg-transparent focus:outline-none text-gray-900" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
                <a rel="noopener noreferrer" href="/" className="text-xs hover:underline text-gray-400">Forgot password?</a>
              </div>
              <input type="password" onChange={handleChange} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-transparent focus:outline-none text-gray-900" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full inline-flex justify-center items-center space-x-2 px-8 py-3 font-semibold transition rounded-md bg-gray-900 text-gray-50">
                {loading && <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                  <path
                    className="fill-blue-800"
                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                  <path
                    className="fill-blue-100"
                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                </svg>}
                <span>Sign in</span>
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">Developed by
              <a rel="noopener noreferrer" href="/" className="hover:underline text-gray-500"> Softbase Tech</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
