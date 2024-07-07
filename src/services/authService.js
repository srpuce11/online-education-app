

const API_URL = process.env.REACT_APP_API_BASE_URL_AUTH.concat("/users");
console.log("API URSL FOR AUTH IS " ,API_URL);

const authService = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login?username=${email}&password=${password}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.log("Login Failed");
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log("Login success");
            sessionStorage.setItem('user', JSON.stringify(data));
            return data.role.toLowerCase();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },
};

export default authService;
