import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

export const Formulario = ({ setCuentas, cuenta, setCuenta, setShow, initialCuenta, guardarCuenta }) => {

    const { tipo, cantidad, precio, total, observacion, id } = cuenta;

    const handleChange = ({ target: { value, name } }) => {
        setCuenta({
            ...cuenta,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipo === '' || total === 0) {
            Swal.fire('Todos los campos son obligatorios')

            return;
        }
        guardarCuenta({ tipo, cantidad, precio, total, observacion, id })
        setCuenta(initialCuenta)


    }


    return (
        <form onSubmit={handleSubmit}>
            <Form.Label >Tipo</Form.Label>

            <Form.Select aria-label="Default select example"
                name='tipo' value={tipo} onChange={handleChange}
            >
                <option value="">-- Seleccione Opcion --</option>
                <option value="venta">Venta</option>
                <option value="deuda">Deuda</option>
                <option value="donacion">Donacion</option>
                <option value="camisetas">Camisetas</option>
            </Form.Select>
            {
                tipo === "venta" &&
                <>

                    <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                    <Form.Control
                        id="cantidad"
                        type={"number"}
                        name="cantidad"
                        value={cantidad}
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor="precio">Precio</Form.Label>
                    <Form.Control
                        id="precio"
                        type={"number"}
                        name="precio"
                        value={precio}
                        onChange={handleChange}
                    />

                </>
            }
            <Form.Label htmlFor="total">Total</Form.Label>
            <Form.Control
                id="total"
                type={"number"}
                name="total"
                value={total}
                onChange={handleChange}
            />
            <Form.Label htmlFor="observacion">Observacion</Form.Label>

            <FloatingLabel controlId="observacion" >
                <Form.Control
                    as="textarea"
                    name='observacion' value={observacion} onChange={handleChange}
                    placeholder="Leave a comment here"
                    style={{ height: '100px', marginBottom: '10px' }}
                />
            </FloatingLabel>

            <Button
                type="submit" variant='success'>Guardar Cuenta</Button>

        </form>
    )
}
