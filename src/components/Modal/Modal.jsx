import './Modal.scss'

const Modal = ({ message, onConfirm, onCancel}) => {
    return (
        <div className='Modal__overlay'>
            <div className='Modal'>
                <p className='Modal__message'>{message}</p>
                <div className='Modal__actions'>
                    <button className='Modal___cancel' onClick={onCancel}>No, cancelar</button>
                    <button className='Modal___confirm' onClick={onConfirm}>Sí, enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal