import pymongo
import random
from faker import Faker
from bson.objectid import ObjectId  # Para manejar correctamente los ObjectIds

# Configuración de la conexión a MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["jencafe"]  # Base de datos jencafe

# Colecciones
colecciones = ["cafes", "pedidos", "facturas", "clientes", "inventario", "productos"]

# Verificar y crear colecciones si no existen
for col in colecciones:
    if col not in db.list_collection_names():
        db.create_collection(col)
        print(f"Colección '{col}' creada.")

# Faker para datos aleatorios
faker = Faker()

# Función para eliminar todos los documentos de una colección
def eliminar_documentos(coleccion):
    with client.start_session() as session:
        db[coleccion].delete_many({}, session=session)

# Función para insertar datos aleatorios en la colección cafes
def insertar_datos_cafes(num_datos):
    eliminar_documentos("cafes")
    
    tipos_cafe = ["Arábica", "Robusta", "Liberica", "Excelsa"]
    
    for _ in range(num_datos):
        cafe = {
            "nombreCafe": faker.word() + " Café",
            "precio": round(random.uniform(5000, 15000), 2),
            "tipo": random.choice(tipos_cafe)
        }
        db["cafes"].insert_one(cafe)

# Función para insertar datos aleatorios en la colección pedidos
def insertar_datos_pedidos(num_datos):
    eliminar_documentos("pedidos")
    
    estados_pedido = ["Pendiente", "Completado"]
    metodos_pago = ["Efectivo", "Tarjeta"]
    
    cafes_list = list(db["cafes"].find())  # Convertir cursor a lista
    clientes_list = list(db["clientes"].find())  # Convertir cursor a lista

    if not cafes_list:
        raise ValueError("La lista de cafes está vacía")
    if not clientes_list:
        raise ValueError("La lista de clientes está vacía")
    
    for _ in range(num_datos):
        pedido = {
            "idCliente": str(random.choice(clientes_list)["_id"]),
            "idCafe": str(random.choice(cafes_list)["_id"]),
            "estadoPedido": random.choice(estados_pedido),
            "metodoPago": random.choice(metodos_pago)
        }
        db["pedidos"].insert_one(pedido)

# Función para insertar datos aleatorios en la colección facturas
def insertar_datos_facturas(num_datos):
    eliminar_documentos("facturas")
    
    pedidos_list = list(db["pedidos"].find())  # Convertir cursor a lista

    if not pedidos_list:
        raise ValueError("La lista de pedidos está vacía")
    
    for _ in range(num_datos):
        factura = {
            "idPedido": str(random.choice(pedidos_list)["_id"]),
            "totalPagar": random.choice([10000, 8000])
        }
        db["facturas"].insert_one(factura)

# Función para insertar datos aleatorios en la colección clientes
def insertar_datos_clientes(num_datos):
    eliminar_documentos("clientes")
    
    for _ in range(num_datos):
        cliente = {
            "nombre": faker.name(),
            "direccion": faker.address(),
            "metodoPago": random.choice(["Efectivo", "PSE", "Tarjeta"])
        }
        db["clientes"].insert_one(cliente)

# Función para insertar datos aleatorios en la colección inventario
def insertar_datos_inventario(num_datos):
    eliminar_documentos("inventario")
    
    cafes_list = list(db["cafes"].find())  # Convertir cursor a lista

    if not cafes_list:
        raise ValueError("La lista de cafes está vacía")
    
    for _ in range(num_datos):
        inv = {
            "idCafe": str(random.choice(cafes_list)["_id"]),
            "cantidad": random.randint(0, 100)
        }
        db["inventario"].insert_one(inv)

# Función para insertar datos aleatorios en la colección productos
def insertar_datos_productos(num_datos):
    eliminar_documentos("productos")
    
    for _ in range(num_datos):
        producto = {
            "nombre": faker.word(),
            "descripcion": faker.sentence(),
            "precio": round(random.uniform(10.0, 100.0), 2),
            "categoria": faker.word(),
            "stock": random.randint(10, 100),
            "imagen": faker.image_url(width=200, height=200)
        }
        db["productos"].insert_one(producto)

if __name__ == "__main__":
    num_datos = 5  # Cantidad de datos aleatorios por colección
    
    # Insertar datos en cada colección
    insertar_datos_clientes(num_datos)  # Insertar clientes primero para que pedidos pueda referenciarlos
    insertar_datos_cafes(num_datos)     # Insertar cafes después para que inventario y pedidos puedan referenciarlos
    insertar_datos_pedidos(num_datos)
    insertar_datos_facturas(num_datos)
    insertar_datos_inventario(num_datos)
    insertar_datos_productos(num_datos)
    
    print(f"{num_datos} datos aleatorios insertados correctamente en cada colección.")
