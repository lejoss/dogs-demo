import styles from './PageTitle.module.css'
export default function PageTitle(props) {
	return (
		<div>
			<img src={props.icon || ''} />	
			<h1>{props.title || ''}</h1>			
		</div>
	)

}