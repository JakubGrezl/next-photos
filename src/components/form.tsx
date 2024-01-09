import "../styles/form.css";

// interface LoginFormSchema {
//   username: string;
//   password: string;
// }

export default async function Form() {
  return (
    <main>
      <div className="wrapper centered-from-header">
        <h1>Login</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
