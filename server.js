import express from 'express';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import cors from 'cors';
mongoose.pluralize(null);
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const mongoURI = 'mongodb+srv://srilayasekar:N94MjeJofaXNAHbl@busbooking.znpw4t3.mongodb.net/QuickBus?retryWrites=true&w=majority&appName=BusBooking';
connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const getRouteSchema = new mongoose.Schema({
    from: String,
    to: String,
    tripdate: Date
});

const Route = mongoose.model('trip', getRouteSchema);

app.use(cors());
app.use(express.json());

app.get('/api/getroutes', async (req, res) => {
    try {
        const getroutedata = await Route.find();
        console.log("hello");
        await getroutedata.forEach(console.dir);
        res.json(getroutedata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/searchroutes', async (req, res) => {
    try {
        const getroutedata = await Route.find({
            from : req.query.from,
            to : req.query.to,
            tripdate : {"$gt": req.query.tripdate , "$lt":req.query.tripdate+1}
        });
        console.log("hello");
        await getroutedata.forEach(console.dir);
        res.json(getroutedata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*app.post('/api/register', async (req, res) => {
    try {
      const { userName, score } = req.body;
      const newLeaderboardEntry = new Leaderboard({ userName, score });
      const savedLeaderboardEntry = await newLeaderboardEntry.save();
      res.json(savedLeaderboardEntry);
    } catch (error) {
      console.error('Error saving leaderboard entry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });*/


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
