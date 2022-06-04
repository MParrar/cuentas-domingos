import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Formulario } from './Formulario'

export const ModalFormulario = ({ show, setShow, setCuentas, cuenta, setCuenta, initialCuenta, guardarCuenta }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{!cuenta.id ? 'Agrega Nueva Cuenta' : 'Editar Cuenta'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formulario
                    setCuentas={setCuentas}
                    cuenta={cuenta}
                    setCuenta={setCuenta}
                    initialCuenta={initialCuenta}
                    setShow={setShow}
                    guardarCuenta={guardarCuenta}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setShow(false)
                    setCuenta(initialCuenta)
                }}>
                    Cerrar
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

