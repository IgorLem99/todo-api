// URL вашего API
const apiUrl = 'http://localhost:8080';

// Показывает форму регистрации
function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('word-list').style.display = 'none';
}

// Показывает форму входа
function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('word-list').style.display = 'none';
}

// Показывает список слов
function showWordList() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('word-list').style.display = 'block';
    fetchWords();
}

// Регистрация пользователя
async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password_hash: password })
    });

    const result = await response.json();
    document.getElementById('register-message').innerText = result.message || 'Registration successful!';
}

// Вход пользователя
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password_hash: password })
    });

    const result = await response.json();
    if (result.token) {
        localStorage.setItem('token', result.token);
        showWordList();
    } else {
        document.getElementById('login-message').innerText = result.message || 'Login failed!';
    }
}

// Добавление слова
async function addWord() {
    const word = document.getElementById('word-input').value;
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/users/words`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ word })
    });

    const result = await response.json();
    if (result.success) {
        fetchWords();
    }
}

// Получение списка слов
async function fetchWords() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/users/words`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const words = await response.json();
    const list = document.getElementById('word-list-container');
    list.innerHTML = '';
    words.forEach(word => {
        const item = document.createElement('li');
        item.textContent = word.word;
        list.appendChild(item);
    });
}

// Выход пользователя
function logout() {
    localStorage.removeItem('token');
    showLoginForm();
}
