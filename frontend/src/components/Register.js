import Authorization from './Authorization';
import { Link } from 'react-router-dom';

function Register(props) {

  return (
    <Authorization
      title="Регистрация"
      buttonText="Зарегистрироваться"
      auth={props.auth}
    >
      <p className="auth__subline">Уже зарегистрированы?&nbsp;
        <Link
          className="auth__link"
          to="/sign-in"
        >
          Войти
        </Link>
      </p>
    </Authorization>
  )
}

export default Register;