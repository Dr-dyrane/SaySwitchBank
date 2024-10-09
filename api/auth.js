// api/auth.js

// Simulated user data for testing
const simulatedUserData = {
	email: "test@example.com",
	username: "testUser", // Include a username field
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Example token
};

// Function to simulate login
export const loginUserAPI = async (credentials) => {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Check if the credentials are valid (for testing, you can customize this)
	if (
		credentials.email === "test@example.com" &&
		credentials.password === "password"
	) {
		return {
			data: { ...simulatedUserData }, // Return simulated user data, including username
		};
	} else {
		throw new Error("Invalid email or password");
	}
};

// Function to simulate sign-up
export const signUpUserAPI = async (credentials) => {
	// Simulate API call delay
    console.log("calling store");

	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Validate the input credentials
	if (credentials.email && credentials.password && credentials.username) {
		// Include username validation
		return {
			data: { ...simulatedUserData, ...credentials }, // Return simulated user data with credentials
		};
	} else {
		// Throw an error if any required field is missing
		throw new Error("Email, password, and username are required for sign-up");
	}
};
