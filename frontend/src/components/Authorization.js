import { useState } from "react";

function Authorization({ title, buttonText, auth, children }) {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    const input = e.target;
    setForm({
      ...form,
      [input.name]: input.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth(form.email, form.password);
  }


  return (
    <section className="auth">
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" type="submit" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        ></input>
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        ></input>
        <button className="auth__submit-btn">{buttonText}</button>
        {children}
      </form>
    </section>
  )
}

export default Authorization;