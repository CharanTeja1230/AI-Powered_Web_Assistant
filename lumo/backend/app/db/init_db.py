from app.database.session import SessionLocal, engine, Base
from app.models.user import User
from app.core.security import get_password_hash

def init_db():
    if engine is not None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            # Seed Admin User
            admin = db.query(User).filter(User.email == "admin@lumo.ai").first()
            if not admin:
                admin_user = User(
                    email="admin@lumo.ai",
                    username="admin",
                    hashed_password=get_password_hash("Admin123!"),
                    role="admin"
                )
                db.add(admin_user)
            
            # Seed Demo User
            user1 = db.query(User).filter(User.email == "user1@lumo.ai").first()
            if not user1:
                demo_user = User(
                    email="user1@lumo.ai",
                    username="user1",
                    hashed_password=get_password_hash("User1Password!"),
                    role="user"
                )
                db.add(demo_user)
            
            db.commit()
        except Exception as e:
            db.rollback()
            print(f"Database seed error: {e}")
        finally:
            db.close()

if __name__ == "__main__":
    init_db()
