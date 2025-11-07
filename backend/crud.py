from sqlmodel import Session, select
from backend.models import Conversation, Message

def create_conversation(session: Session) -> Conversation:
    conversation = Conversation()
    session.add(conversation)
    session.commit()
    session.refresh(conversation)
    return conversation

def get_conversation(session: Session, conversation_id: int) -> Conversation:
    return session.get(Conversation, conversation_id)

def add_message_to_conversation(session: Session, conversation_id: int, text: str, is_user: bool) -> Message:
    message = Message(conversation_id=conversation_id, text=text, is_user=is_user)
    session.add(message)
    session.commit()
    session.refresh(message)
    return message
