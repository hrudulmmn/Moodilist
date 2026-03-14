import sqlalchemy as sql
from sqlalchemy.orm import declarative_base
from sqlalchemy.dialects.postgresql import UUID

base = declarative_base()

class Moodlogs(base):
    __tablename__ = "mood_logs"

    id=sql.Column(UUID(as_uuid=True),primary_key=True)
    mood = sql.Column(sql.String)
    confidence = sql.Column(sql.Float)
    created_at = sql.Column(sql.DateTime(timezone=True),server_default=sql.sql.func.now())
    clerk_id = sql.Column(sql.String)
    clerk_username = sql.Column(sql.String)
    
