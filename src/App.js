
import './app.scss';
import { useState, useEffect, useRef } from 'react'

function App() {

  const [formData, setFormData] = useState({})
  const submittedRef = useRef('');
  const [submitted, setSubmitted] = useState(false)
  const [missedData, setMissedData] = useState({
    email: true,
    phone: true,
    message: true
  })
  const [valideData, setValideData] = useState({
    email: false,
    phone: false,
    message: false
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }
  useEffect(() => {
    submittedRef.current = submitted;
  }, [submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("missedData pred", missedData)
    console.log("valideData pred", valideData)

    // if (formData.email === "neexistujici@email.cz") {
    //   alert("Neexistující emailová adresa")
    //   return
    // }
    if (formData.email !== "" && !formData.email === "neexistujici@email.cz") {
      // var emailValidated = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(formData.email)
      var emailValidated = true
      if (emailValidated) {
        setValideData(data => ({ ...data, email: true }))
        setMissedData(data => ({ ...data, email: false }))
        alert('email je ok')
      }
    }
    // if (!isNaN(formData.phone)) {
    //   var phoneLength = formData.phone.toString().length
    //   if (phoneLength === 9) {
    //     setValideData(data => ({ ...data, phone: true }))
    //     setMissedData(data => ({ ...data, phone: false }))
    //   }
    // }
    // if (formData.message.length > 0) {
    //   setValideData(data => ({ ...data, message: true }))
    //   setMissedData(data => ({ ...data, message: false }))
    // }

    console.log("missedData", missedData)
    console.log("valideData", valideData)

    //   else {
    //     submittedRef.current = setTimeout(() => setSubmitted(true), 3000);

    //   }
    // }
    // else {
    //   setMissedData(data => ({ ...data, message: true }))
    // }
  }

  return (
    <div className="app">
      <div className={`${submitted ? 'app__form-container--submitted' : 'app__form-container'}`}>
        {!submitted ?
          (
            <form className="app__form-container__form" onSubmit={handleSubmit}>
              <label>Jméno:
                <br></br>
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label>Email:{
                (missedData.emailPhone && !missedData.message)
                  ? <span> Vyplň email nebo telefon</span> : ""}
                {
                  (valideData.email &&
                    <span> Zkontroluj formát emailu</span>)}
                <br></br>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>Telefon:{
                (missedData.emailPhone && !missedData.message)
                  ? <span> Vyplň email nebo telefon</span> : ""}
                {valideData.phone && <span> Zkontroluj formát čísla</span>}
                {valideData.phone && <span> Doplň číslo</span>}
                <br></br>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>

              <label>Zpráva:{missedData.message ? <span> Toto pole je povinné</span> : ""}
                <br></br>
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
          (
            <h1>Úspěšně odesláno</h1>
          )
        }
      </div>
    </div>
  )
}

export default App