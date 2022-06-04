export const generarId = () => {
    const random = Math.random().toString(36).slice(2, 36);
    const fecha = Date.now().toString(36);
    return (random + fecha).toString();
}

// export const descargarExcel = (data, fecha,) => {
//     console.log(data)
//     return (

//         <Workbook
//             filename={`Cuenta${nombres}.xlsx`}
//             element={
//                 <button button className="btn btn-md btn-success">
//                     {' '}
//                     Descargar
//                 </button>
//             }
//         >
//             <Workbook.Sheet data={data} name="Sheet A">
//                 <Workbook.Column label="Tipo" value={"tipo"} />
//                 <Workbook.Column label="Cantidad" value="cantidad" />
//                 <Workbook.Column label="Total" value="total" />
//                 <Workbook.Column label="Observacion" value={"observacion"} />
//             </Workbook.Sheet>
//         </Workbook>
//     );

// };
