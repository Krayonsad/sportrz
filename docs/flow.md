# Application Flow – Sportrz

## 👤 User Flow

1. User lands on homepage → browses game catalog.
2. Unauthenticated users see a "login/signup" prompt when they try to access a game.
3. Logged-in users:
   - View dashboard with recommendations
   - Browse games and add to favorites
   - Subscribe to a 1-day/weekly/monthly plan
4. Users can:
   - Add friends
   - View friend activities (shared games)
   - See suggested games based on mutual interests

## 🔁 Data Flow

- Games (catalog) are fetched from the database.
- User actions (login, purchase, add-friend) trigger API routes.
- Recommendation engine uses:
   - Game tags/interests
   - Friend activities
   - Past access history

