# Firebase Cart Persistence Setup

Your app now saves cart data to Firebase Firestore for each user. Here's how to set it up:

## Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database**
4. Create a database (if not already created)

## Step 2: Set Firestore Rules

Replace the existing Firestore rules with these:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read/write their own cart
    match /carts/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow users to read/write their own orders
    match /orders/{userId}/orders/{orderId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow users to read/write their profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Step 3: How It Works

### When User Logs In:
- Cart is automatically loaded from Firebase (`carts/{userId}` collection)
- Falls back to localStorage if Firebase unavailable

### When User Adds/Removes Items:
- Cart is automatically saved to Firebase in real-time
- Also backed up to browser localStorage

### When User Logs Out:
- Cart is cleared from memory
- Data persists in Firebase for next login

## Step 4: Testing

1. Log in with your account
2. Add items to cart
3. Refresh the page - cart should still be there
4. Log out and log back in - cart should persist
5. Open in another browser/device (same account) - cart should sync

## Troubleshooting

If cart doesn't persist:

1. **Check Browser Console** (F12 → Console):
   - Look for error messages about Firestore permissions
   - Should see logs: "Cart saved to Firestore successfully" or "Cart loaded from Firestore successfully"

2. **Check Firestore Rules**:
   - Ensure rules are correctly pasted in Firebase Console
   - Rules must be in the exact format shown above

3. **Check Authentication**:
   - User must be logged in
   - Check that `user.uid` matches the error messages

4. **Fallback Works**:
   - Even without proper Firestore rules, cart data is saved to localStorage
   - This works within the same browser
   - Cross-device sync won't work without Firestore

## Database Structure

```
Firestore
├── carts (collection)
│   ├── user-id-123 (document)
│   │   ├── items (array)
│   │   │   ├── [0]
│   │   │   │   ├── productId: "1"
│   │   │   │   └── quantity: 2
│   │   │   └── [1]
│   │   │       ├── productId: "5"
│   │   │       └── quantity: 1
│   │   ├── updatedAt: "2026-03-29T10:30:00.000Z"
│   │   └── userId: "user-id-123"
```

## Key Features

✅ Cart persists across browser sessions  
✅ Cart syncs across devices (same account)  
✅ Automatic save on every cart change  
✅ LocalStorage fallback if offline  
✅ Cleared when user logs out  
✅ Only user can access their own cart (secure)  
