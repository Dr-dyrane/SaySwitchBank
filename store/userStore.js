// store/userStore.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const generateRandomToken = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
};

const userStore = {
	// Static test user data for fallback
	staticUserData: {
		email: "test@example.com",
		username: "testUser",
		password: "password", // For demo purposes
		token: "testToken", // Example token, but will be replaced later
	},

	// Function to login a user
	login: async (credentials) => {
		try {
			// Simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Retrieve all users from AsyncStorage
			const usersData = await AsyncStorage.getItem("users");
			const users = usersData ? JSON.parse(usersData) : [];

			// Include static user data if no users are found
			if (users.length === 0) {
				users.push(userStore.staticUserData); // Add static user data to the array
			}

			console.log("Retrieved users from AsyncStorage:", users); // Debugging output

			// Check if the credentials match any user by email
			const user = users.find((user) => {
				const userEmail = user.email ? user.email.trim().toLowerCase() : null; // Trim and lower case the user email
				const inputEmail = credentials.email.trim().toLowerCase(); // Trim and lower case the input email

				console.log(
					`Comparing user email: ${userEmail} with input email: ${inputEmail}`
				); // Debugging output

				return userEmail === inputEmail;
			});

			// Validate user and password
			if (user) {
				console.log("User found:", user); // Debugging output
				console.log("User password:", user.password); // Debugging output
				console.log("Input password:", credentials.password); // Debugging output

				if (user.password === credentials.password) {
					// Password matches
					const token = generateRandomToken(); // Generate a new token for the user
					user.token = token; // Assign the generated token

					// Save user data to AsyncStorage
					await AsyncStorage.setItem("currentUser", JSON.stringify(user));
					return { data: user }; // Return user data
				} else {
					// Password mismatch
					console.error("Password does not match.");
					throw new Error("Invalid email or password");
				}
			} else {
				// User not found
				console.error("No user found with the provided email.");
				throw new Error("Invalid email or password");
			}
		} catch (error) {
			console.error("Login error:", error.message);
			throw error; // Rethrow error for further handling
		}
	},

	// Function to sign up a new user
	signUp: async (credentials) => {
		try {
			// Simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Validate credentials
			if (credentials.email && credentials.password && credentials.username) {
				const newUser = {
					email: credentials.email,
					username: credentials.username,
					password: credentials.password,
					token: generateRandomToken(), // Generate a unique token for new user
				};

				// Retrieve existing users from AsyncStorage
				const usersData = await AsyncStorage.getItem("users");
				const users = usersData ? JSON.parse(usersData) : [];

				// Include static user data for comparison
				if (users.length === 0) {
					users.push(userStore.staticUserData); // Add static user data to the array
				}

				// Check if the user already exists
				const userExists = users.some((user) => user.email === newUser.email);
				if (userExists) {
					throw new Error("User already exists");
				}

				// Save new user data to AsyncStorage
				users.push(newUser);
				await AsyncStorage.setItem("users", JSON.stringify(users));

				return { data: newUser }; // Return new user data
			} else {
				throw new Error(
					"Email, password, and username are required for sign-up"
				);
			}
		} catch (error) {
			//console.error("Sign-up error:", error.message);
			throw error; // Rethrow error for further handling
		}
	},

	// Function to get current user data
	getCurrentUser: async () => {
		try {
			const userData = await AsyncStorage.getItem("currentUser");
			if (userData) {
				return { data: JSON.parse(userData) }; // Return current user data
			} else {
				throw new Error("User not found");
			}
		} catch (error) {
			//console.error("Get current user error:", error.message);
			throw error; // Rethrow error for further handling
		}
	},
};

export default userStore;
