const authService = {
    login: async (email, password) => {
        try {
            const response = await fetch(`http://192.168.29.245:8081/api/users/login?username=${email}&password=${password}`, {
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
