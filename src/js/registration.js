import * as basicLightbox from 'basiclightbox';
import Notiflix from 'notiflix';

const button = document.querySelector('.registration-btn');

const emailPattern =
/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/;

button.addEventListener('click', () => {
  const content = `
    <div class="modal">
    <h4 class="reg-title">Registration</h4>
      <form class="registration-form">
        <label for="text" class="label">Sign Up
          <input type="email" class="input" email="sign up" />
        </label>
        <label for="password" class="label">Password
          <input type="password" class="input" name="password" />
          <button class="show-password">Show/Hide password</button>
        </label>
        <button type="submit" class="sign-button">Sign up</button>
      </form>
      <button class="log-account">Already have an account</button>
      <button class="reg-close-btn">
        <svg class="reg-close-icon">
          <use href="./img/icons.svg#close-icon"></use>
        </svg>
      </button>
    </div>
  `;

  const signModal = basicLightbox.create(content);
  signModal.show();

  const closeRegistrationBtn = document.querySelector('.reg-close-icon')
  closeRegistrationBtn.addEventListener('click', () => {
      signModal.close();
    })
  
  const registrationForm = document.querySelector('.registration-form');

  registrationForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const signName = document.querySelector('.sign-name').value;
    const signPassword = document.querySelector('.sign-password');
    const showPassword = document.querySelector('.show-password');   
    
    showPassword.addEventListener('click', () => {
      if (signPassword.type === 'password') {
          signPassword.type = 'text';
      } else {
          signPassword.type = 'password';
      }
  });
    if(signName === "" && signPassword.value === "") {
        Notiflix.Notify.warning('Please insert a valid email address')
        return
    }

    if(!emailPattern.test(signName)) {
        Notiflix.Notify.warning('Please insert a valid email address');
        return
    }
    if (signPassword.value.length <= 6) {
      Notiflix.Notify.warning('Password should have at least 6 symbols');
      return;
    }

    const newUser = {
      username: signName,
      password: signPassword.value,
    };

    localStorage.setItem('login-info', JSON.stringify(newUser));

    Notiflix.Notify.success('Registration successful');

    signModal.close();
    openLoginModal();
  });

  const loginBtn = document.querySelector('.log-account');
  loginBtn.addEventListener('click', () => {
    signModal.close();
    openLoginModal();
  });

  function openLoginModal() {
    const logForm = `
      <div class="modal">
      <h4 class="reg-title">Login</h4>
        <form class="login-form">
          <label for="text" class="label">Email
            <input type="email" class="input" name="login" />
          </label>
          <label for="password" class="label">Password
            <input type="password" class="input" name="password" />
            <button type="button" class="show-password">Show/Hide password</button>
          </label>
          <button type="submit" class="login-button">Log In</button>
        </form>
        <button class="sign-account">Don't have an account</button>
        <button class="reg-close-btn">
        <svg class="reg-close-icon">
          <use href="./img/icons.svg#close-icon"></use>
        </svg>
      </button>
      </div>`;

    const logModal = basicLightbox.create(logForm);
    logModal.show();

    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', evt => {
      evt.preventDefault();

      const loginName = document.querySelector('.login-name').value;
      const loginPassword = document.querySelector('.login-password');
      // const showPassword = document.querySelector('.show-password')

      showPassword.addEventListener('click', () => {
        if (loginPassword.type === 'password') {
            loginPassword.type = 'text';
        } else {
            loginPassword.type = 'password';
        }
    });

      const storedUser = JSON.parse(localStorage.getItem('login-info'));

      if (
        storedUser &&
        storedUser.username === loginName &&
        storedUser.password === loginPassword.value
      ) {
        Notiflix.Notify.success('Login successful');
        logModal.close();
      } else {
        Notiflix.Notify.failure('Login failed. Please check your credentials');
      }
    });

    const signAccountBtn = document.querySelector('.sign-account');
    signAccountBtn.addEventListener('click', () => {
      logModal.close();
      signModal.show();
    });

    const closeBtn = document.querySelector('.reg-close-btn')
    closeBtn.addEventListener('click', ()=> {
      logModal.close()
      signModal.close()
    })
  }
});
