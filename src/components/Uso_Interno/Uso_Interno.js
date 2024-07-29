import React, { useEffect, useState } from 'react';
import './Uso_Interno.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Uso_Interno() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // Estado para manejar la edición

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditingProduct(null);
        setFormData({ nombre: '', descripcion: '', precio: '', stock: '' });
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setFormData({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            stock: product.stock
        });
        handleOpen();
    };

    const handleDelete = async (id) => {
        try {            
            // Realiza la solicitud DELETE a la API
            await axios.delete(`http://localhost:3001/productos/delete/${id}`);
            
            // Actualiza el estado local para reflejar la eliminación
            setProducts(products.filter(product => product.id !== id));
            
            alert('Producto eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/productos');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const response = await axios.put(`http://localhost:3001/productos/update/${editingProduct}`, formData);
                
                setProducts(products.map(product => product.id === editingProduct ? { ...product, ...formData } : product));
                
                /*
                if (response.status === 200) {
                    onUpdate(response.data); // Llamada para actualizar el estado o realizar otras acciones
                    alert('Producto actualizado con éxito');
                }
                */

                alert('Producto actualizado con éxito');
                
            } else {
                const response = await axios.post('http://localhost:3001/productos/store', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProducts([...products, response.data]);
                alert('Producto registrado con éxito');
            }
            handleClose();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al registrar el producto:', error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;
    if (products.length === 0) return <p>No hay productos disponibles.</p>;

    return (
        <section className="content">
            <div>
                <h2>Interfaz Vendedor</h2>
                <Button onClick={handleOpen}>Nuevo producto</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h5" component="h5">
                            {editingProduct ? 'Editar producto' : 'Registro de productos'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Container>
                                <Row>
                                    <Col>
                                        <TextField
                                            required
                                            id="outlined-basic"
                                            label="Nombre del producto"
                                            variant="outlined"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            id="outlined-basic"
                                            label="Descripción del producto"
                                            variant="outlined"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            id="filled-number"
                                            label="Precio"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            id="filled-number"
                                            label="Stock"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type="submit" variant="contained">
                                            {editingProduct ? 'Actualizar' : 'Guardar'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </Box>
                </Modal>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            {products.map((product) => (                                
                                <TableRow key={product._id}>
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(product)}>Editar</Button>
                                        <Button onClick={() => handleDelete(product._id)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
}

export default Uso_Interno;
