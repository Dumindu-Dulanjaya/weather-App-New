# MongoDB Atlas Setup Guide (FREE Cloud Database)

## Why You Need This:
Your Railway backend uses `localhost` MongoDB which doesn't work in production. You need a cloud database.

## Setup Steps:

### 1. Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with Google/GitHub or email

### 2. Create a Free Cluster
1. Choose **M0 (FREE)** tier
2. Select **AWS** provider
3. Choose region closest to you (e.g., Singapore for Sri Lanka)
4. Cluster name: `WeatherCluster`
5. Click "Create Cluster" (takes 3-5 minutes)

### 3. Create Database User
1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Username: `weatherapp`
4. Password: Generate a secure password (SAVE THIS!)
5. Database User Privileges: **Read and write to any database**
6. Click "Add User"

### 4. Allow Network Access
1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go to **Database** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string:
```
mongodb+srv://weatherapp:<password>@weathercluster.xxxxx.mongodb.net/weatherDB?retryWrites=true&w=majority
```

### 6. Replace `<password>` with your actual password

Example:
```
mongodb+srv://weatherapp:MySecurePass123@weathercluster.xxxxx.mongodb.net/weatherDB?retryWrites=true&w=majority
```

### 7. Import Your Data to Atlas
Using MongoDB Compass:
1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to Atlas using the connection string
3. Import your JSON data

OR using mongoimport command line:
```bash
mongoimport --uri "mongodb+srv://weatherapp:password@cluster.mongodb.net/weatherDB" --collection weather_data --file yourdata.json --jsonArray
```

### 8. Update Railway Environment Variable
1. Go to Railway dashboard
2. Click on your service
3. Go to **Variables**
4. Edit `MONGO_URI` value to your Atlas connection string
5. Service will auto-redeploy

### 9. Update Local .env (Optional - for local testing)
Edit `.env` file:
```
MONGO_URI=mongodb+srv://weatherapp:password@cluster.mongodb.net/weatherDB?retryWrites=true&w=majority
```

## Test Connection:
Your backend should now connect to Atlas instead of localhost!

Test endpoints:
- https://weather-app-new-production.up.railway.app/api/profiles/latest
- http://localhost:5000/api/profiles/latest (local)

## Troubleshooting:
- **Authentication failed**: Check password in connection string
- **Network timeout**: Make sure IP is whitelisted (0.0.0.0/0)
- **Database not found**: Import your data to Atlas
