import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# --- URL de Conexión a la Base de Datos ---
# Utiliza la variable de entorno si está disponible, si no, usa la cadena local.
# ¡Aquí es donde pones la contraseña que acabas de compartir!
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Teamosao1_@localhost/inventory_db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
