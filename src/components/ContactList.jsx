import React from 'react'
import ContactItems from './ContactItems'
import styles from './ContactList.module.css'

function ContactList({ contacts, onEdit, search, onDelete }) {
    const searchList = () => {
        return contacts?.filter(i => {
            if (search) {
                if (
                    i?.name?.includes(search) ||
                    i?.lastName?.includes(search) ||
                    i?.email?.includes(search)
                ) {
                    return i
                }
            } else {
                return i
            }
        })
    }
    return (
        <div className={styles.container}>
            <h3>contact list</h3>
            {
                searchList().length ? (
                    <ul className={styles.contacts} >
                        {searchList().map((contact) => (
                            <ContactItems
                                key={contact.id}
                                data={contact}
                                onEdit={onEdit}
                                onDelete={onDelete}

                            />))}
                    </ul>
                ) : (<p className={styles.message}>no contact yet !</p>)
            }

        </div>
    )
}

export default ContactList