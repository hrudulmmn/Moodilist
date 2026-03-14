import sqlalchemy as sql
from sqlalchemy.orm import sessionmaker
import dotenv as dot
import os

dot.load_dotenv()
dburl = os.getenv("DATABASE_LINK")
engine = sql.create_engine(dburl)

session=sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def getdb():
    db = session()
    try:
        yield db
    finally:
        db.close()