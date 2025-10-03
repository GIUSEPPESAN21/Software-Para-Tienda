from pydantic import BaseModel

# --- Schemas para Inventory ---

class InventoryItemBase(BaseModel):
    name: str
    quantity: int

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItem(InventoryItemBase):
    id: int

    class Config:
        from_attributes = True # Renombrado de 'orm_mode'

# --- Schemas para Orders (a ser utilizados en el futuro) ---

class OrderBase(BaseModel):
    title: str
    price: float

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    status: str

    class Config:
        from_attributes = True # Renombrado de 'orm_mode'

