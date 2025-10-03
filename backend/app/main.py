import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Importaciones locales
from . import crud, models, schemas
from .database import SessionLocal, engine

# Crea las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Gestión de Inventario",
    description="Backend para la aplicación de gestión de inventarios y pedidos.",
    version="1.0.0"
)

# --- Configuración de CORS ---
# Lista de orígenes que tienen permitido hacer peticiones a nuestra API
origins = [
    "http://localhost:3000",  # El origen del frontend de React
    "http://localhost:5173",  # Otro puerto común para Vite/React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todas las cabeceras
)
# --- Fin de la configuración de CORS ---


# --- Dependencia para la Sesión de Base de Datos ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Endpoints de la API ---

@app.get("/api/inventory", response_model=List[schemas.InventoryItem], tags=["Inventory"])
def read_inventory(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_inventory_items(db, skip=skip, limit=limit)
    return items

@app.post("/api/inventory", response_model=schemas.InventoryItem, status_code=201, tags=["Inventory"])
def create_inventory_item(item: schemas.InventoryItemCreate, db: Session = Depends(get_db)):
    db_item = crud.get_inventory_item_by_name(db, name=item.name)
    if db_item:
        return crud.update_inventory_item_quantity(db=db, item=db_item, quantity_to_add=item.quantity)
    return crud.create_inventory_item(db=db, item=item)

# --- Punto de entrada para ejecutar la aplicación ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)