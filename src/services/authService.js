const authService = {
    login: async (email, password) => {
        // Mock implementation. Replace with actual API call.
        if (email === 'teacher@gmail.com' && password === '123') {
            console.log("Teached logged In");
            return 'teacher';
        } else if (email === 'student@gmail.com' && password === '123') {
            console.log("Student logged In");
            return 'student';

        } else {
            console.error('Invalid credentials');
            throw new Error('Invalid credentials');
        }
    },
};

export default authService;
