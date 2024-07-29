import pymongo
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

def export_db_structure_and_data(uri, db_name, export_path):
    try:
        # Conectar a la base de datos MongoDB
        client = pymongo.MongoClient(uri)
        db = client[db_name]
        
        # Diccionario para almacenar la estructura y datos
        db_export = {}
        
        # Iterar sobre todas las colecciones en la base de datos
        for collection_name in db.list_collection_names():
            collection = db[collection_name]
            
            # Obtener un cursor para iterar sobre los documentos en la colección
            cursor = collection.find()
            
            # Almacenar los documentos en una lista
            collection_data = [doc for doc in cursor]
            
            # Aplicar el JSONEncoder para ObjectId
            collection_data_encoded = JSONEncoder().encode(collection_data)
            
            # Almacenar los datos en el diccionario de exportación
            db_export[collection_name] = json.loads(collection_data_encoded)
        
        # Exportar el diccionario a un archivo JSON con indentación
        with open(export_path, 'w') as f:
            json.dump(db_export, f, indent=4)
        
        print(f"Exportación completada. Datos guardados en {export_path}")
    
    except pymongo.errors.ConnectionFailure as e:
        print(f"No se pudo conectar a la base de datos MongoDB: {e}")
    except pymongo.errors.OperationFailure as e:
        print(f"Error en la operación con la base de datos MongoDB: {e}")
    except IOError as e:
        print(f"Error de escritura en el archivo: {e}")
    except Exception as e:
        print(f"Ocurrió un error durante la exportación de datos: {e}")
    finally:
        # Cerrar la conexión a la base de datos
        client.close()

# Parámetros de conexión y exportación
mongo_uri = "mongodb://localhost:27017"
database_name = "jencafe"
output_file = "jencafe_export.json"

# Ejecutar la función
export_db_structure_and_data(mongo_uri, database_name, output_file)