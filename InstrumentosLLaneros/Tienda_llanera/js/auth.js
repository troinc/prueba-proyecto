// auth.js - Manejo de autenticación de usuarios

document.addEventListener('DOMContentLoaded', () => {
    // Formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Formulario de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
        loadUserProfile();
    }

    // Verificar estado de autenticación
    checkAuthStatus();
});

// Manejar inicio de sesión
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Aquí iría la lógica de autenticación con el backend
        const success = await mockLoginRequest(email, password);
        if (success) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        alert('Error al iniciar sesión. Por favor, intente nuevamente.');
    }
}

// Manejar registro de usuario
async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        // Aquí iría la lógica de registro con el backend
        const success = await mockRegisterRequest(userData);
        if (success) {
            alert('Registro exitoso. Por favor, inicie sesión.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error en registro:', error);
        alert('Error al registrar. Por favor, intente nuevamente.');
    }
}

// Manejar actualización de perfil
async function handleProfileUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profileData = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        telefono: formData.get('telefono')
    };

    try {
        // Aquí iría la lógica de actualización con el backend
        const success = await mockUpdateProfileRequest(profileData);
        if (success) {
            alert('Perfil actualizado exitosamente.');
        }
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        alert('Error al actualizar perfil. Por favor, intente nuevamente.');
    }
}

// Verificar estado de autenticación
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const authLinks = document.querySelectorAll('.auth-link');
    const userEmail = localStorage.getItem('userEmail');

    authLinks.forEach(link => {
        if (isAuthenticated) {
            if (link.classList.contains('login-link')) {
                link.style.display = 'none';
            } else if (link.classList.contains('profile-link')) {
                link.style.display = 'block';
            }
        } else {
            if (link.classList.contains('login-link')) {
                link.style.display = 'block';
            } else if (link.classList.contains('profile-link')) {
                link.style.display = 'none';
            }
        }
    });
}

// Cargar datos del perfil de usuario
async function loadUserProfile() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
        // Aquí iría la lógica para obtener datos del perfil desde el backend
        const userData = await mockGetUserProfile(userEmail);
        if (userData) {
            document.getElementById('nombre').value = userData.nombre;
            document.getElementById('apellido').value = userData.apellido;
            document.getElementById('email').value = userData.email;
            document.getElementById('telefono').value = userData.telefono || '';
        }
    } catch (error) {
        console.error('Error al cargar perfil:', error);
    }
}

// Funciones mock para simular llamadas al backend
function mockLoginRequest(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
}

function mockRegisterRequest(userData) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
}

function mockUpdateProfileRequest(profileData) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
}

function mockGetUserProfile(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nombre: 'Usuario',
                apellido: 'Ejemplo',
                email: email,
                telefono: '300-123-4567'
            });
        }, 1000);
    });
}
