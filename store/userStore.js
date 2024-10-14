import AsyncStorage from "@react-native-async-storage/async-storage";

const generateRandomToken = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
};

const userStore = {
	staticUserData: {
		email: "test@example.com",
		username: "testUser",
		password: "password",
		token: "testToken",
	},

	login: async (credentials) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const usersData = await AsyncStorage.getItem("users");
			let users = usersData ? JSON.parse(usersData) : [];

			if (!Array.isArray(users)) {
				users = [];
			}

			if (users.length === 0) {
				users.push(userStore.staticUserData);
				await AsyncStorage.setItem("users", JSON.stringify(users));
			}

			const user = users.find(
				(user) =>
					user.email &&
					user.email.trim().toLowerCase() ===
						credentials.email.trim().toLowerCase()
			);

			if (user && user.password === credentials.password) {
				const token = generateRandomToken();
				user.token = token;

				const updatedUsers = users.map((u) =>
					u.email === user.email ? user : u
				);
				await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
				await AsyncStorage.setItem("token", token);

				return { data: user };
			} else {
				throw new Error("Invalid email or password");
			}
		} catch (error) {
			console.error("Login error:", error.message);
			throw error;
		}
	},

	signUp: async (credentials) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (
				!credentials.email ||
				!credentials.password ||
				!credentials.username
			) {
				throw new Error(
					"Email, password, and username are required for sign-up"
				);
			}

			const newUser = {
				email: credentials.email,
				username: credentials.username,
				password: credentials.password,
				token: generateRandomToken(),
			};

			const usersData = await AsyncStorage.getItem("users");
			let users = usersData ? JSON.parse(usersData) : [];

			if (!Array.isArray(users)) {
				users = [];
			}

			if (users.length === 0) {
				users.push(userStore.staticUserData);
			}

			if (users.some((user) => user.email === newUser.email)) {
				throw new Error("User already exists");
			}

			users.push(newUser);
			await AsyncStorage.setItem("users", JSON.stringify(users));
			await AsyncStorage.setItem("token", newUser.token);

			return { data: newUser };
		} catch (error) {
			console.error("Sign-up error:", error.message);
			throw error;
		}
	},

	getCurrentUser: async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				throw new Error("No user logged in");
			}

			const usersData = await AsyncStorage.getItem("users");
			let users = usersData ? JSON.parse(usersData) : [];

			if (!Array.isArray(users)) {
				throw new Error("Invalid user data");
			}

			const user = users.find((user) => user.token === token);

			if (user) {
				return { data: user };
			} else {
				throw new Error("User not found");
			}
		} catch (error) {
			console.error("Get current user error:", error.message);
			throw error;
		}
	},

	updateUser: async (newData) => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				throw new Error("No user logged in");
			}

			const usersData = await AsyncStorage.getItem("users");
			let users = usersData ? JSON.parse(usersData) : [];

			if (!Array.isArray(users)) {
				throw new Error("Invalid user data");
			}

			const userIndex = users.findIndex((user) => user.token === token);

			if (userIndex === -1) {
				throw new Error("User not found");
			}

			users[userIndex] = { ...users[userIndex], ...newData };
			await AsyncStorage.setItem("users", JSON.stringify(users));
			return { data: users[userIndex] };
		} catch (error) {
			console.error("Update user error:", error.message);
			throw error;
		}
	},

	// logout: async () => {
	// 	try {
	// 		await AsyncStorage.removeItem("token");
	// 	} catch (error) {
	// 		console.error("Logout error:", error.message);
	// 		throw error;
	// 	}
	// },
};

export default userStore;
