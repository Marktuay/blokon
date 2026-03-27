window.AuthManager = {
    _usersDbKey: 'pe_users_db',
    _sessionKey: 'pe_current_session',

    init: function() {
        if (!localStorage.getItem(this._usersDbKey)) {
            localStorage.setItem(this._usersDbKey, JSON.stringify([]));
        }
    },

    getUsers: function() {
        return JSON.parse(localStorage.getItem(this._usersDbKey) || '[]');
    },

    getUser: function() {
        const session = localStorage.getItem(this._sessionKey);
        return session ? JSON.parse(session) : null;
    },

    login: function(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            // Eliminar password de la session por seguridad
            const { password: _, ...sessionUser } = user;
            localStorage.setItem(this._sessionKey, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }
        return { success: false, message: 'Credenciales incorrectas' };
    },

    register: function(firstName, email, password) {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'El correo ya está registrado' };
        }
        
        const newUser = {
            id: 'US' + Date.now(),
            firstName,
            lastName: '',
            email,
            password, // En un servidor real esto iría hasheado
            phone: '',
            billing: {
                company: '',
                address_1: '',
                city: '',
                state: '',
                postcode: '',
                country: 'MX'
            },
            orders: []
        };
        
        users.push(newUser);
        localStorage.setItem(this._usersDbKey, JSON.stringify(users));
        
        // Auto-login
        const { password: _, ...sessionUser } = newUser;
        localStorage.setItem(this._sessionKey, JSON.stringify(sessionUser));
        
        return { success: true, user: sessionUser };
    },

    updateUser: function(updatedData) {
        let currentUser = this.getUser();
        if (!currentUser) return false;

        let users = this.getUsers();
        const index = users.findIndex(u => u.id === currentUser.id);
        
        if (index > -1) {
            // Merge actual con editado guardando pass original
            const originalPass = users[index].password;
            users[index] = { ...users[index], ...updatedData, password: originalPass };
            localStorage.setItem(this._usersDbKey, JSON.stringify(users));
            
            // Actualizar session
            const { password: _, ...sessionUser } = users[index];
            localStorage.setItem(this._sessionKey, JSON.stringify(sessionUser));
            return true;
        }
        return false;
    },

    logout: function() {
        localStorage.removeItem(this._sessionKey);
        window.location.href = 'login.html';
    }
};

window.AuthManager.init();
