import { useEffect, useState } from "react";
import { Cuenta } from "./Cuenta";
import { Col, Table, Pagination, Row, Container } from 'react-bootstrap';

export const Tabla = ({ cuentas, setCuenta, setShow, eliminarCuenta, domingo }) => {
    const [maxRows, setMaxRows] = useState(10);
    const [minRows, setMinRows] = useState(0);
    const [pages, setPage] = useState(null);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        if (cuentas.length > 0) {
            const contPages = Math.ceil(cuentas.length / 10);
            const totalPages = new Array(contPages).fill(0);
            setPage(totalPages);
        }
    }, [cuentas]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleNextPage = () => {
        setMaxRows((rows) => rows + 10);
        setMinRows((rows) => rows + 10);
        setActivePage(Math.round(maxRows / 10));
    };

    const handlePrevPage = () => {
        if (minRows > 0) {
            setMaxRows((rows) => rows - 10);
            setMinRows((rows) => rows - 10);
            setActivePage(Math.round(minRows / 10) - 1);
        }
    };

    const handlePagination = (index) => {
        setActivePage(index);
        if (index === 0) {
            setMaxRows(10);
            setMinRows(0);
            return;
        }
        setMaxRows((rows) => (index + 1) * 10);
        setMinRows((rows) => index * 10);
    };

    const handleFirstPage = () => {
        setMaxRows(10);
        setMinRows(0);
        setActivePage(0);
    };

    const handleLastPage = () => {
        setMaxRows(pages.length * 10);
        setMinRows(pages.length * 10 - 10);
        setActivePage(pages.length - 1);
    };
    return (
        <Container>

            <Row className="tablaUsuario">
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    xl={12}
                    xxl={12}
                    style={{ overflowX: 'auto' }}
                >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tipo</th>
                                <th>Total</th>
                                <th>Observacion</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuentas?.length > 0 ? (
                                cuentas?.map((cuenta, index) => {
                                    if (index < maxRows && index >= minRows && cuenta.domingoId == domingo.id) {
                                        return (
                                            <Cuenta
                                                key={index}
                                                cuenta={cuenta}
                                                index={index}
                                                setCuenta={setCuenta}
                                                //   index={index}
                                                //   setMaquina={setMaquina}
                                                setShow={setShow}
                                                eliminarCuenta={eliminarCuenta}
                                            //   eliminarMaquina={eliminarMaquina}
                                            //   cuarteles={cuarteles}
                                            />
                                        );
                                    } else {
                                        return null
                                    }
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        No existen datos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {pages?.length > 1 ? (
                        <Pagination>
                            {activePage > 0 ? (
                                <>
                                    <Pagination.First onClick={handleFirstPage} />
                                    <Pagination.Prev onClick={handlePrevPage} />
                                </>
                            )
                                :
                                null
                            }

                            {pages ?
                                pages?.map((page, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={index === activePage && true}
                                        onClick={() => handlePagination(index)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                )) : null}

                            {activePage < pages?.length - 1 && (
                                <>
                                    <Pagination.Next onClick={handleNextPage} />
                                    <Pagination.Last onClick={handleLastPage} />
                                </>
                            )}
                        </Pagination>
                    ) : null}
                </Col>
            </Row>
        </Container>

    )
}
