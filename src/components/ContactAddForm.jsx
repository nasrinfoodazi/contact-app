import React, { useState } from 'react'
import inputs from '../constants/inputs';
import styles from './contact.module.css'


function ContactAddForm({ selectedItem, type, onChange, onCancel }) {
    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState("")
    const [contact, setContact] = useState(selectedItem || {
        id: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setErrors(validateInputs(name, value))
        setContact((contact) => ({ ...contact, [name]: value }))
    }

    const validateInputs = (name, value) => {
        if (name === 'email' && !validateEmail(value) && value) {
            return ({ ...errors, [name]: "Email is invalid" })
        } else if (name === 'phone' && value && value.length !== 11) {
            return ({ ...errors, [name]: "Phone is invalid" })
        } else if (!value) {
            return ({ ...errors, [name]: "This field is required" })
        } else {
            Reflect.deleteProperty(errors, name)
            return ({ ...errors, [name]: null })
        }
    }
    const addHandler = () => {
        if (!contact.name || !contact.lastName || !contact.email || !contact.phone || (contact.email && !validateEmail(contact.email))) {
            setAlert("please enter valid data")
            return;
        }
        setAlert("");
        onChange({ type, item: contact })
        setContact({
            name: "",
            lastName: "",
            email: "",
            phone: "",
        })
    }
    return (
        <div className={styles.container}>

            <div className={styles.alert}>{alert && <p>{alert}</p>}</div>

            <div className={styles.form}>
                {

                    inputs.map((input, index) => <span key={index} className={styles.inputContent}>

                        <input
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            value={contact[input.name]}
                            onChange={changeHandler}
                        />
                        {
                            (errors?.[input.name] && (<span className={styles.inputError}>{errors?.[input.name]}</span>)) || null
                        }
                    </span>)
                }
                <div className={styles.formAdd}>
                    <button onClick={addHandler}>{(type === 'add' && 'Add contact') || 'Edit contact'}</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ContactAddForm