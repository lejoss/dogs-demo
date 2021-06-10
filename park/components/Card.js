import styles from './Card.module.css'
export default function Card({ children, variant, item, ...props }) {
	return (
		<div
			className={`
				${styles.card}
				${variant === 'accent' && styles.bg__accent}
				${variant === 'dark' && styles.bg__dark}
				${variant === 'light' && styles.bg__light}
				${item && styles.flex__item}
			`}
			{...props}
			>
			{children}
		</div>
	)
}