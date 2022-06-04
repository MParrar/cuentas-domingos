import React from 'react'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Cuenta = ({ cuenta, index, setCuenta, setShow, eliminarCuenta, initialCuenta }) => {

    const { id, tipo, total, observacion } = cuenta;

    const eliminarCuentaFormulario = (id) => {
        Swal.fire({
            title: 'Esta seguro de eliminar la cuenta?',
            text: "Esta cuenta no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCuenta(id);
                Swal.fire(
                    'Eliminado!',
                    'La cuenta fue eliminada.',
                    'success'
                )
            }
        })
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{tipo}</td>
            <td>{total}</td>
            <td>{observacion ? observacion : 'No posee observacion'}</td>
            <td className="text-center">
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-editar">Editar</Tooltip>}
                >
                    <Button
                        size="sm"
                        style={{ marginRight: '7px' }}
                        variant="warning"
                        onClick={() => {
                            setCuenta(cuenta);
                            setShow(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-eliminar">Eliminar</Tooltip>}
                >
                    <Button
                        size="sm"
                        style={{ marginRight: '7px' }}
                        variant="danger"
                        className="ml-3"
                        onClick={() => eliminarCuentaFormulario(id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </OverlayTrigger>
            </td>
        </tr>

    )
}
