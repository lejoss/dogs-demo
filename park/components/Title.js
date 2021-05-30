import styles from './Title.module.css'
export default function Title({ children, ...props }) {
	return <h1 className={styles.title} {...props}>{children}</h1>
}