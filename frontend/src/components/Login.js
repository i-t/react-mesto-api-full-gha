import Authorization from './Authorization';

function Login(props) {

  return (
    <Authorization
      title="Вход"
      buttonText="Войти"
      auth={props.auth}
    />
  )
}

export default Login;