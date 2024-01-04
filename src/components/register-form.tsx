import "@/styles/form.css";

export default async function Form() {
  return (
    <main>
      <div className="wrapper centered-from-header">
        <h1>Register</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
              type="password"
              id="repeat-password"
              name="repeat-password"
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
