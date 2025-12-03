from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=True)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    seller_id = Column(Integer, nullable=False)
