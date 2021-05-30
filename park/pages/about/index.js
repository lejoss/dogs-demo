import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from '/components/Modal'
export default function About(props) {
	return (
		<Modal>
			<ModalOpenButton>
				<button>Open Modal</button>
			</ModalOpenButton>
			<ModalContents aria-label="Modal label (for screen readers)">
				<ModalDismissButton>
					<button>Close Modal</button>
				</ModalDismissButton>
				<h3>Modal title</h3>
				<div>Some great contents of the modal</div>
			</ModalContents>
		</Modal>
	)

}