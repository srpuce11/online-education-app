

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
    register: async (email, password, role) => {
        try {
          const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
          });
    
          if (!response.ok) {
            throw new Error('Registration failed');
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error registering:', error);
          throw error;
        }
      },
};

export default authService;
