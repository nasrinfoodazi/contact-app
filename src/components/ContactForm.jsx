import React, { useState } from 'react'
import { v4 } from 'uuid';
import ContactList from './ContactList';
import inputs from '../constants/inputs';
import styles from './contact.module.css'
import ContactAddForm from './ContactAddForm';


function ContactForm() {
    const [contacts, setContacts] = useState([])
    const [search, setSaerch] = useState(null)
    const [deleteItem, setDeleteItem] = useState(null)
    const [type, setType] = useState("list")
    const [selectedItem, setSelectedItem] = useState(null)

    const onChange = ({ item, type }) => {
        if (type === 'add') {
            const newContact = { ...item, id: v4() }
            setContacts((contacts) => ([...contacts, newContact]))
        } else if (type === 'edit') {
            let index = contacts.findIndex(i => i.id === item.id)
            if (index > -1) {
                contacts[index] = item
            }
            setContacts(contacts)
        }
        setType('list')
        setSelectedItem(null)
    }
    const onDelete = (item) => {
        setDeleteItem(item)

    }
    const deleteFunc = (type) => {
        if (type === 'ok') {
            let nContacts = contacts.filter(i => i.id !== deleteItem.id)
            setContacts(nContacts)
        }
        setDeleteItem(null)

    }
    return (
        <div className={styles.container}>

            {
                (deleteItem?.id && (
                    <div className={styles.confirmModal}>
                        <div className={styles.modalContent}>

                            <div>Are you sure you want to delete this item?</div>
                            <div className={styles.modalAction}>
                                <button onClick={() => deleteFunc('ok')}>ok</button>
                                <button onClick={() => deleteFunc('cancel')}>cancel</button>
                            </div>

                        </div>
                    </div>
                )) || null
            }
            {
                (type === 'list' && (
                    <>
                        <div className={styles.head}>


                            <input
                                type={'text'}
                                name={'search'}
                                placeholder={'search'}
                                value={search}
                                className={styles.search}
                                onChange={(e) => setSaerch(e.target.value)}
                            />
                            <button onClick={() => setType('add')}>Add contact</button>
                        </div>

                        <ContactList
                            search={search}
                            contacts={contacts}
                            onEdit={(item) => {
                                setSelectedItem(item)
                                setType('edit')
                            }}
                            onDelete={onDelete}

                        />
                    </>

                )) || null
            }
            {
                (['add', 'edit'].includes(type) && (
                    <ContactAddForm
                        type={type}
                        selectedItem={selectedItem}
                        onChange={onChange}
                        onCancel={() => {
                            setType('list')
                            setSelectedItem(null)
                        }}
                    />
                )) || null
            }

        </div>
    )
}

export default ContactForm