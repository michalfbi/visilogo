from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# --- Models ---

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    date: str
    imageUrl: Optional[str] = None

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "slug": "ai-marketing-2025",
                "title": "AI in Marketing",
                "excerpt": "Brief description...",
                "content": "Full content...",
                "category": "Tech",
                "date": "2025-08-10"
            }
        }

# --- Routes ---

@api_router.get("/")
async def root():
    return {"message": "VisiLogo API is running"}

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.posts.find().to_list(1000)
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.posts.find_one({"slug": slug})
    if post:
        return post
    raise HTTPException(status_code=404, detail="Post not found")

# --- Startup & Seeding ---

INITIAL_POSTS = [
    {
        "slug": "ai-w-marketingu-2025",
        "title": "AI w Marketingu: Jak automatyzacja zmienia zasady gry w 2025 roku",
        "excerpt": "Sztuczna inteligencja to nie przyszłość, to teraźniejszość. Zobacz, jak wykorzystujemy AI do personalizacji i optymalizacji kampanii.",
        "category": "AI & Tech",
        "date": "2025-08-10",
        "content": "Sztuczna inteligencja przestała być buzzwordem, a stała się fundamentem nowoczesnych strategii marketingowych. W VisiLogo nie boimy się technologii – wykorzystujemy ją, by nasi klienci wyprzedzali konkurencję o lata świetlne. Od generowania hyper-spersonalizowanego contentu, przez predykcyjną analitykę zachowań konsumentów, aż po automatyzację obsługi klienta. W 2025 roku marketing bez AI jest jak jazda dorożką po autostradzie. Jest klimatycznie, ale wszyscy Cię wyprzedzają. W tym artykule pokażemy konkretne case study wdrożeń, które zwiększyły ROI o ponad 300%."
    },
    {
        "slug": "psychologia-koloru-w-sprzedazy",
        "title": "Ciemny motyw w UX: Dlaczego marki premium wybierają czerń?",
        "excerpt": "Czerń to kolor luksusu, tajemnicy i elegancji. Dowiedz się, dlaczego dark mode to coś więcej niż trend.",
        "category": "Branding",
        "date": "2025-08-05",
        "content": "Czy zastanawiałeś się, dlaczego najdroższe karty kredytowe są czarne? Dlaczego aplikacje tradingowe i high-tech stawiają na dark mode? Ciemne tło zmniejsza zmęczenie oczu, ale przede wszystkim buduje atmosferę ekskluzywności i skupienia. W VisiLogo stosujemy zasadę 90/10 – 90% głębokiej czerni i 10% jaskrawego akcentu. To kieruje uwagę użytkownika dokładnie tam, gdzie chcemy: na Call to Action. Przeanalizujemy psychologię koloru w digital designie i podpowiemy, kiedy warto zgasić światło na swojej stronie www."
    },
    {
        "slug": "seo-przyszlosci",
        "title": "Koniec SEO jakie znasz. Era Search Generative Experience",
        "excerpt": "Jak pozycjonować się w czasach, gdy odpowiedzi udziela AI, a nie lista linków? Nowa strategia widoczności.",
        "category": "Strategia",
        "date": "2025-07-28",
        "content": "Google zmienia się na naszych oczach. SGE (Search Generative Experience) sprawia, że walka o 'pierwsze miejsce w wynikach wyszukiwania' zmienia się w walkę o bycie źródłem wiedzy dla AI. Tradycyjne słowa kluczowe tracą na znaczeniu na rzecz autorytetu tematycznego (Topical Authority). W tym wpisie rozbieramy na czynniki pierwsze nowe algorytmy i pokazujemy, jak budować Content Huby, które przetrwają każdą aktualizację. Spoiler: jakość > ilość."
    },
    {
        "slug": "skuteczny-landing-page",
        "title": "Anatomia Landing Page'a, który konwertuje na zimnym ruchu",
        "excerpt": "Bez zbędnych ozdobników. Tylko psychologia, UX i copywriting, który zamyka sprzedaż.",
        "category": "Web Design",
        "date": "2025-07-15",
        "content": "Piękna strona to za mało. Strona musi sprzedawać. Wielu klientów przychodzi do nas z witrynami, które wyglądają jak dzieła sztuki, ale nie generują ani jednego leada. Dlaczego? Bo zapominają o użytkowniku. W tym artykule przeprowadzimy Cię przez naszą autorską strukturę sekcji: Hero, Problem, Agitacja, Rozwiązanie, Social Proof i CTA. Pokażemy, jak sterować wzrokiem odwiedzającego i jakich błędów unikać, by nie przepalać budżetu reklamowego."
    }
]

@app.on_event("startup")
async def startup_db_client():
    # Check if posts exist, if not seed them
    count = await db.posts.count_documents({})
    if count == 0:
        logger.info("Seeding database with initial blog posts...")
        for post in INITIAL_POSTS:
            post["_id"] = str(uuid.uuid4())
            await db.posts.insert_one(post)
        logger.info("Database seeded.")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
