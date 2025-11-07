from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, create_engine
from pydantic import BaseModel
from backend import crud, models, ai_service

# Database setup
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_session():
    with Session(engine) as session:
        yield session

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

class ChatRequest(BaseModel):
    conversation_id: int
    text: str

class ChatResponse(BaseModel):
    bot_response: str

@app.post("/api/conversation", response_model=models.Conversation)
def create_conversation(session: Session = Depends(get_session)):
    return crud.create_conversation(session=session)

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest, session: Session = Depends(get_session)):
    # 1. Add user's message to the conversation
    crud.add_message_to_conversation(
        session=session,
        conversation_id=request.conversation_id,
        text=request.text,
        is_user=True
    )

    # 2. Get conversation history
    conversation = crud.get_conversation(session=session, conversation_id=request.conversation_id)

    # 3. Generate AI response
    bot_response_text = ai_service.generate_response(
        conversation_history=conversation.messages,
        user_prompt=request.text
    )

    # 4. Add bot's response to the conversation
    crud.add_message_to_conversation(
        session=session,
        conversation_id=request.conversation_id,
        text=bot_response_text,
        is_user=False
    )

    return ChatResponse(bot_response=bot_response_text)
