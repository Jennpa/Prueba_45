import pymongo
import random
from faker import Faker

# Configura la conexión a tu base de datos MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["jencafe"]  # Nombre de tu base de datos
productos = db["productos"]  # Nombre de tu colección de productos

# Faker para generar datos aleatorios
faker = Faker()

# Función para insertar datos aleatorios de productos
def insertar_productos(num_productos):
    productos.delete_many({})  # Borra todos los productos existentes
    
    for _ in range(num_productos):
        producto = {
            "nombre": faker.word(),
            "descripcion": faker.sentence(),
            "precio": round(random.uniform(1.0, 100.0), 2),
            "categoria": faker.word(),
            "stock": random.randint(0, 100),
            "imagen": faker.image_url(width=200, height=200),
        }
        productos.insert_one(producto)

if __name__ == "__main__":
    num_productos = 20  # Número de productos a insertar
    insertar_productos(num_productos)
    print(f"{num_productos} productos insertados correctamente.")
