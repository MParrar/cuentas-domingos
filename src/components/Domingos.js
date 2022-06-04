import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { generarId } from '../helpers';
import logo from '../img/logo.png'
import { ModalCuenta } from './ModalCuenta';

export const Domingos = () => {
    const [domingos, setDomingos] = useState([{
        nombre: '',
        total: 0,
        id: generarId()
    }]);
    const [cuentas, setCuentas] = useState([]);
    const [totales, setTotales] = useState({ ganancias: 0, deudas: 0, id: '' });
    const [domingoSeleccionado, setDomingoSeleccionado] = useState({});
    const [showCuenta, setShowCuenta] = useState(false);
    const [ejecutar, setEjecutar] = useState(0);

    useEffect(() => {
        setCuentas(localStorage.getItem('cuentas') ? JSON.parse(localStorage.getItem('cuentas')) : [])
    }, []);

    const add = () => {
        const newDomingo = {
            nombre: '',
            total: 0,
            id: generarId()
        }
        setDomingos([...domingos, newDomingo])
        setEjecutar(ejecutar + 1)

    };
    useEffect(() => {


        localStorage.setItem('domingos', JSON.stringify(domingos));



    }, [domingos]); // eslint-disable-line react-hooks/exhaustive-deps
    const remove = (id) => {
        setDomingos(domingos.filter(domingo => domingo.id !== id))
        setEjecutar(ejecutar + 1)

    }

    const handleChange = (e, domingo) => {
        const pos = domingos.indexOf(domingo)
        domingo.nombre = e.target.value
        let todosLosDomingos = [...domingos]
        todosLosDomingos[pos] = domingo
        setDomingos(todosLosDomingos);

    }

    const show = (domingo) => {
        console.log(domingo)
        setDomingoSeleccionado(domingo, true)
        setShowCuenta(true)
    }

    const ganancias = (id) => {

        return cuentas?.map(item => (item.tipo === 'deuda' && item.domingoId === id) && item).reduce((a, b) => a + (parseInt(b["total"]) || 0), 0)

    }
    return (
        <Container>
            <Row className='mt-5 '>
                {domingos.map((domingo, i) => (
                    <Col xxl={4} md={4} sm={12} xs={12}>
                        <Card style={{ width: '20rem', height: '14rem' }}>
                            <button onClick={() => show(domingo)}> ver</button>
                            <Card.Body>
                                <Card.Title><input type={'text'} name="nombre" onChange={(e) => handleChange(e, domingo)} value={domingo.nombre} /></Card.Title>
                                <Card.Text>
                                    <h5>Ganancias {JSON.parse(localStorage.getItem('cuentas')).map(item => (item.tipo !== 'deuda' && item.domingoId === domingo.id) && item).reduce((a, b) => a + (parseInt(b["total"]) || 0), 0)}</h5>
                                    <h5>Deudas {JSON.parse(localStorage.getItem('cuentas')).map(item => (item.tipo === 'deuda' && item.domingoId === domingo.id) && item).reduce((a, b) => a + (parseInt(b["total"]) || 0), 0)}</h5>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <button onClick={() => add()}>+</button>
                                {i > 0 && <button onClick={() => remove(domingo.id)}>-</button>}
                            </Card.Footer>
                        </Card>
                        <ModalCuenta
                            domingo={domingoSeleccionado}
                            setShowCuenta={setShowCuenta}
                            showCuenta={showCuenta}
                        />

                    </Col>

                ))}

            </Row>
        </Container>

    )
}
