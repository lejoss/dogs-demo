import React from 'react'
import { Dialog } from '@reach/dialog'
import "@reach/dialog/styles.css";

const ModalContext = React.createContext()

function Modal(props) {
	const [isOpen, setIsOpen] = React.useState(false)
	return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalOpenButton({ children: child }) {
	const [_, setIsOpen] = React.useContext(ModalContext)
	return React.cloneElement(child, {
		onClick: () => setIsOpen(true)
	})
}

function ModalDismissButton({ children: child }) {
	const [_, setIsOpen] = React.useContext(ModalContext)
	return React.cloneElement(child, {
		onClick: () => {
			setIsOpen(false)
			child && child.props && child.props.onClick && child.props.onClick()
		}
	})
}

function ModalContents(props) {
	const [isOpen, setIsOpen] = React.useContext(ModalContext)

	return <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />

}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
