
import './app.scss';
import { useState, useEffect, useRef, Fragment } from 'react'

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const submittedRef = useRef('');
  const [submitted, setSubmitted] = useState(false)
  const [missedData, setMissedData] = useState({})
  const [formIsValide, setFormIsValide] = useState(false)

  const handleChange = (event) => {
    const updateData = { ...formData, [event.target.name]: event.target.value }
    setFormData(updateData)
  }

  useEffect(() => {
    submittedRef.current = submitted;
  }, [submitted]);

  var emailValidationResult;
  const emailValidation = (email) => {
    if (email === "") {
      setMissedData(data => ({ ...data, email: true }))
      emailValidationResult = false
    }
    else if (email === "neexistujici@email.cz") {
      alert("Neexistující emailová adresa")
      return
    }
    else if (email !== "") {
      emailValidationResult = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)
      if (emailValidationResult) {
        setMissedData(data => ({ ...data, email: false }))
      }
      else {
        alert('Zkontroluj formát emailu')
      }
    }
    return emailValidationResult
  }

  var phoneValidationResult;
  const phoneValidation = (phone) => {
    if (phone === "") {
      setMissedData(data => ({ ...data, phone: true }))
      phoneValidationResult = false
    }
    else if (isNaN(phone)) {
      phoneValidationResult = false
      alert("Zkontroluj formát čísla (9 číslic)")
    }
    else {
      var phoneLength = phone.toString().length
      if (phoneLength === 9) {
        setMissedData(data => ({ ...data, phone: false }))
        phoneValidationResult = true
      }
      else {
        phoneValidationResult = false
        alert("Zkontroluj formát čísla (9 číslic)")
      }
      return phoneValidationResult
    }
  }

  var messageValidationResult;
  const messageValidation = (message) => {
    if (message.length > 0) {
      setMissedData(data => ({ ...data, message: false }))
      messageValidationResult = true
    }
    else if (message === "") {
      setMissedData(data => ({ ...data, message: true }))
      messageValidationResult = false
    }
    return messageValidationResult
  }

  var formValidationResult;
  const formValidation = () => {
    let message = messageValidation(formData.message);
    let phone = phoneValidation(formData.phone);
    let email = emailValidation(formData.email);
    if (message && (phone || email)) {
      formValidationResult = true
    }
    else {
      formValidationResult = false
    }
    return formValidationResult
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValide = formValidation();
    // setFormIsValide(formValidation());
    setFormIsValide(isValide);
    if (isValide) {
      submittedRef.current = setTimeout(() => setSubmitted(true), 3000);
      submittedRef.current = setTimeout(() => setSubmitted(false), 5000);
      setTimeout(() =>
        (setFormIsValide(false), formData.email = "", formData.message = "", formData.phone = "", formData.name = ""), 5000);
    }
  }


  return (
    <div className="app">
      <div className={`${(submitted || formIsValide) ? 'app__form-container--submitted' : 'app__form-container'}`}>
        {!submitted && !formIsValide ?
          (
            <form className="app__form-container__form" onSubmit={handleSubmit}>
              <label>Jméno:
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label>Email:{
                (missedData.email && missedData.phone)
                  ? <span> Vyplň email nebo telefon</span> : ""}
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>Telefon:{
                (missedData.phone && missedData.email)
                  ? <span> Vyplň email nebo telefon</span> : ""}
                <br />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>

              <label>Zpráva:{missedData.message ? <span> Toto pole je povinné</span> : ""}
                <br />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>
              <div className="app__form-container__form__button">
                <button type="submit">Odeslat</button>
              </div>
            </form>
          )
          :
          !submitted && formIsValide ?
            (
              <Fragment>
                <progress id="bar" max={100}></progress>
                <label htmlFor="bar">
                  Formulář se odesílá...
                </label>
              </Fragment>

            )
            :
            submitted && formIsValide ?
              (
                <h1>Úspěšně odesláno</h1>
              )
              : ""
        }
      </div>
    </div>
  )
}

export default App