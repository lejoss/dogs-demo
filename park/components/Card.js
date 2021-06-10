import styles from './Card.module.css'
export default function Card({ children, variant }) {
	return <div className={`${styles.card} ${variant === 'accent' && styles.bg__accent}`}>{children}</div>
}