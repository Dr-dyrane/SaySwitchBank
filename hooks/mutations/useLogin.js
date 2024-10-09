import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Import your AuthContext
import { loginUserAPI } from '../../api/auth'; // Import your simulated API call

const useLogin = () => {
	const { login } = useContext(AuthContext); // Get the login function from context

	const loginUser = async (credentials) => {
		try {
			const response = await loginUserAPI(credentials); // Call the simulated API
			const { token, ...userData } = response.data; // Extract token and user data

			// Store the user data and token in context
			await login({ ...userData, token });
            return true; // Return true if login is successful
		} catch (error) {
			throw error; // Rethrow error for handling in LoginScreen
		}
	};

	return { login: loginUser }; // Return the login function
};

export default useLogin;
