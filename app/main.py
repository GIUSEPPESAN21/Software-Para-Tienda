import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

# Importaciones locales
from . import crud, models, schemas
from .database import SessionLocal, engine

# Crea las tablas en la base de datos (en un entorno de producción, se usaría Alembic para migraciones)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Gestión de Inventario",
    description="Backend para la aplicación de gestión de inventarios y pedidos.",
    version="1.0.0"
)

# --- Dependencia para la Sesión de Base de Datos ---
def get_db():
    """
    Crea una sesión de base de datos para cada petición y la cierra al finalizar.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Endpoints de la API ---

@app.get("/api/inventory", response_model=List[schemas.InventoryItem], tags=["Inventory"])
def read_inventory(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtiene una lista de todos los ítems del inventario.
    """
    items = crud.get_inventory_items(db, skip=skip, limit=limit)
    return items

@app.post("/api/inventory", response_model=schemas.InventoryItem, status_code=201, tags=["Inventory"])
def create_inventory_item(item: schemas.InventoryItemCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo ítem en el inventario.
    Si el ítem ya existe (por nombre), actualiza su cantidad.
    """
    db_item = crud.get_inventory_item_by_name(db, name=item.name)
    if db_item:
        # Si el item existe, actualizamos la cantidad
        return crud.update_inventory_item_quantity(db=db, item=db_item, quantity_to_add=item.quantity)
    
    # Si no existe, lo creamos
    return crud.create_inventory_item(db=db, item=item)

# --- Punto de entrada para ejecutar la aplicación ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
