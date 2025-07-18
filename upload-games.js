// This script uses your existing Firebase configuration
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, serverTimestamp, getDocs, deleteDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Import your existing Firebase config
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadGamesSequentially() {
  try {
    // Read the games.json file
    const gamesPath = path.join(__dirname, 'src/lib/games.json');
    const gamesData = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    
    console.log(`Found ${gamesData.length} games to upload`);
    
    // Upload games one by one to maintain order
    for (let i = 0; i < gamesData.length; i++) {
      const game = gamesData[i];
      
      try {
        // Prepare the game data
        const gameData = {
          id: game.id,
          name: game.name,
          categories: Array.isArray(game.categories) ? game.categories : [game.categories],
          path: game.path,
          thumbnail: game.thumbnail || '',
          uploadOrder: i + 1, // Add order field to maintain sequence
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        // Upload to Firebase using the game id as document ID
        const gameRef = doc(db, 'games', game.id);
        await setDoc(gameRef, gameData);
        
        console.log(`✅ Uploaded game ${i + 1}/${gamesData.length}: ${game.name} (ID: ${game.id})`);
        
        // Optional: Add a small delay to avoid overwhelming Firebase
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error uploading game ${game.id}:`, error);
        // Continue with next game even if one fails
      }
    }
    
    console.log('🎉 All games uploaded successfully!');
    
  } catch (error) {
    console.error('❌ Error reading games file or initializing upload:', error);
  }
}

// Clean up function to remove all existing games (use with caution!)
async function clearGamesCollection() {
  try {
    const gamesRef = collection(db, 'games');
    const snapshot = await getDocs(gamesRef);
    
    if (snapshot.empty) {
      console.log('No games found to delete');
      return;
    }
    
    // Delete documents one by one (Firebase v9+ doesn't support batch deletes in client SDK)
    const deletePromises = snapshot.docs.map(docSnapshot => 
      deleteDoc(doc(db, 'games', docSnapshot.id))
    );
    
    await Promise.all(deletePromises);
    console.log(`🗑️  Deleted ${snapshot.size} games from collection`);
    
  } catch (error) {
    console.error('❌ Error clearing games collection:', error);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--clear')) {
    console.log('⚠️  Clearing existing games collection...');
    await clearGamesCollection();
    console.log('Collection cleared. Run without --clear to upload games.');
    return;
  }
  
  console.log('Using sequential upload method...');
  await uploadGamesSequentially();
  
  // Exit the process
  process.exit(0);
}

// Run the script
main().catch(console.error);