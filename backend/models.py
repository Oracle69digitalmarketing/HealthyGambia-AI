from sqlmodel import Field, SQLModel, Relationship
from typing import List, Optional
import datetime

class Conversation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)

    messages: List["Message"] = Relationship(back_populates="conversation")

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id")
    is_user: bool
    text: str
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)

    conversation: Conversation = Relationship(back_populates="messages")
