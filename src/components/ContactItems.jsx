import styles from './Contactitem.module.css'

function ContactItems({ data, onEdit, onDelete }) {
  return (

    <li className={styles.item}>
      <p>{data.name} {data.lastName}</p>
      <p><span></span>{data.email}</p>
      <p><span></span>{data.phone}</p>
      <p><button className={styles.delet} onClick={() => onDelete(data)}>Delet</button> <button className={styles.edit} onClick={() => onEdit(data)}>Edit</button></p>
    </li>

  )
}

export default ContactItems