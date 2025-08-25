import { useState, type FormEvent } from 'react';

function Contact() {
  const password = 'swordfish';
  const [authorized, setAuthorized] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const enteredPassword = e.currentTarget.querySelector(
      'input[type="password"]') as HTMLInputElement;
    const auth = enteredPassword.value === password;
    setAuthorized(auth)
  }

  const login = (
    <form action="#" onSubmit={handleSubmit}>
      <input type="password" placeholder="Password" />
      <input type="submit" />
    </form>
  );

  const contactInfo = (
    <ul>
      <li>client@example.com</li>
      <li>555.555.5555</li>
    </ul>
  );

  return (
    <div id="authorization">
      <h1>{authorized ? "Contact" : "Enter the Password"}</h1>
      {authorized ? contactInfo : login}
    </div>
  );
}

export default Contact;