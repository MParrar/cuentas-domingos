import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, OverlayTrigger, Row, Tooltip, Alert, Button } from 'react-bootstrap'
import { generarId } from "../helpers/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logo.png'
import { ModalFormulario } from './Modal';
import { Tabla } from './Tabla';
const initialCuenta = {
    id: null,
    tipo: "",
    cantidad: 0,
    precio: 0,
    total: 0,
    observacion: "",
    domingoId: null
}
export const ModalCuenta = ({ domingo, showCuenta, setShowCuenta }) => {
    console.log(domingo)
    const [cuentas, setCuentas] = useState([]);
    const [show, setShow] = useState(false);
    const [cuenta, setCuenta] = useState(initialCuenta);
    const [ejecutar, setEjecutar] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setCuentas(localStorage.getItem('cuentas') ? JSON.parse(localStorage.getItem('cuentas')).filter(item => item.domingoId === domingo.id) : [])
        setEjecutar(ejecutar + 1)

    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {

        if (ejecutar > 1) {
            localStorage.setItem('cuentas', JSON.stringify(cuentas));

        }

    }, [ejecutar]); // eslint-disable-line react-hooks/exhaustive-deps


    const sumaTotal = () => {

        if (cuentas.length > 0) {
            const deudas = cuentas.map(item => (item.tipo === 'deuda' && item.domingoId === domingo.id) && item).reduce((a, b) => a + (parseInt(b["total"]) || 0), 0);
            const ganancias = cuentas.map(item => (item.tipo !== 'deuda' && item.domingoId === domingo.id) && item).reduce((a, b) => a + (parseInt(b["total"]) || 0), 0);

            return (ganancias - deudas)
        }

    }

    const eliminarCuenta = (id) => {
        setLoading(true)
        let cuentasActualizadas = (cuentas.filter(item => item.id !== id))
        setCuentas(cuentasActualizadas);
        setEjecutar(ejecutar + 1)
        setLoading(false)
    }

    const guardarCuenta = cuenta => {
        if (cuenta.id) {
            setLoading(true)
            const cuentaActualizados = cuentas.map(cuentaState => cuentaState.id === cuenta.id ? cuenta : cuentaState);
            cuentaActualizados.domingoId = domingo.id
            setCuentas(cuentaActualizados);
            setEjecutar(ejecutar + 1)
            setLoading(false)
        } else {
            setLoading(true)
            cuenta.id = generarId();
            cuenta.domingoId = domingo.id
            setCuentas([...cuentas, cuenta]);
            setEjecutar(ejecutar + 1)
            setLoading(false)
        }
        setTimeout(() => {
            setShow(false);
        }, 500);
    }

    return (
        <Modal show={showCuenta} fullscreen={true} onHide={() => setShowCuenta(false)}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={2} lg="2">
                        <img
                            src={logo} style={{ height: '100px', float: 'left' }}
                            alt={"Logo"}
                        />
                    </Col>
                    <Col xs={8} md="auto">
                        <h1 className="text-center">
                            <b> Calculo de cuentas</b>
                        </h1>
                        <h3
                            className="text-center"
                        >La Montaña
                        </h3></Col>
                    <Col xs={2} lg="2">
                        <img
                            src={logo}
                            style={{ height: '100px', float: 'right' }}
                            alt={"Logo"}
                        />
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col className="text-center mb-3">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-eliminar">Nueva Cuenta</Tooltip>}
                    >
                        <Button
                            size="lg"
                            style={{ marginRight: '7px' }}
                            variant="primary"
                            className="ml-3"
                            onClick={() => setShow(true)}
                        >
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        </Button>
                    </OverlayTrigger>
                </Col>
            </Row>


            <ModalFormulario
                show={show}
                setShow={setShow}
                setCuentas={setCuentas}
                cuenta={cuenta}
                setCuenta={setCuenta}
                initialCuenta={initialCuenta}
                guardarCuenta={guardarCuenta}
            />
            <Tabla
                cuentas={cuentas}
                setShow={setShow}
                setCuenta={setCuenta}
                eliminarCuenta={eliminarCuenta}
                domingo={domingo}
            />
            {cuentas.length > 0 &&
                <Container>
                    <Alert variant={sumaTotal() > 0 ? 'success' : "danger"}>
                        <p className="text-center mt-3">
                            Total: {sumaTotal()}
                        </p>

                    </Alert>
                </Container>}
        </Modal>
    )
}
