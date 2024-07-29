from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client.jencafe

class Product(BaseModel):
    name: str
    price: float
    image: str

@app.post("/products")
def create_product(product: Product):
    db.products.insert_one(product.dict())
    return {"message": "Product created successfully"}

@app.get("/products")
def get_products():
    products = list(db.products.find())
    for product in products:
        product["_id"] = str(product["_id"])
    return products

@app.put("/products/{product_id}")
def update_product(product_id: str, product: Product):
    db.products.update_one({"_id": ObjectId(product_id)}, {"$set": product.dict()})
    return {"message": "Product updated successfully"}

@app.delete("/products/{product_id}")
def delete_product(product_id: str):
    db.products.delete_one({"_id": ObjectId(product_id)})
    return {"message": "Product deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
