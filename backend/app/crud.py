from sqlalchemy.orm import Session
from . import models, schemas

# --- Funciones CRUD para Inventory ---

def get_inventory_item(db: Session, item_id: int):
    """
    Obtiene un ítem del inventario por su ID.
    """
    return db.query(models.Inventory).filter(models.Inventory.id == item_id).first()

def get_inventory_item_by_name(db: Session, name: str):
    """
    Obtiene un ítem del inventario por su nombre (insensible a mayúsculas/minúsculas).
    """
    return db.query(models.Inventory).filter(models.Inventory.name.ilike(name)).first()

def get_inventory_items(db: Session, skip: int = 0, limit: int = 100):
    """
    Obtiene todos los ítems del inventario con paginación.
    """
    return db.query(models.Inventory).offset(skip).limit(limit).all()

def create_inventory_item(db: Session, item: schemas.InventoryItemCreate):
    """
    Crea un nuevo ítem en el inventario.
    """
    db_item = models.Inventory(name=item.name, quantity=item.quantity)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_inventory_item_quantity(db: Session, item: models.Inventory, quantity_to_add: int):
    """
    Actualiza la cantidad de un ítem existente en el inventario.
    """
    item.quantity += quantity_to_add
    db.commit()
    db.refresh(item)
    return item
