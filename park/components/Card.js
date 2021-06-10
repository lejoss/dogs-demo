import styles from './Card.module.css'
export default function Card({ children, variant, item, pointer, ...props }) {
	return (
		<div
			className={`
				${item && styles.flex__item}
				${pointer && styles.pointer}
				${styles.card}
				${variant === 'accent' && styles.bg__accent}
				${variant === 'dark' && styles.bg__dark}
				${variant === 'light' && styles.bg__light}
			`}
			{...props}
			>
			{children}
		</div>
	)
}