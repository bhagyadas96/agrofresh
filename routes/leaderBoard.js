const express = require('express');
const router = express.Router();

const User = require('../models/user');
const LeaderBoard = require('../models/leaderBoard');
const DailyQuiz = require('../models/dailyQuiz');

//route when status is text 
router.get('/list', async(req, res) => {
    try {

        const user = await User.find().exec();

        //to get todays date
        var start = new Date();
        start.setHours(0, 0, 0, 0);
        var end = new Date();
        end.setHours(23, 59, 59, 999);
        // Query of todays date
        var query = { "date": { $gte: start, $lt: end } };

        const dailyQuiz = await DailyQuiz.findOne(query).exec()

        const leaderBoard = await LeaderBoard.find().exec();
        //const delte = await LeaderBoard.deleteMany().exec()
        res.json({ success: true, data: leaderBoard });
    } catch (error) {
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation " + error
        });
    }
});

async function createOrUpdate(dailyQuiz) {
    try {
        const user = await User.find().exec();
        const leaders = [];
        user.forEach(function(e) {
            leaders.push({
                user_id: e._id,
                rank: 1
            });
        });
        leaders = await LeaderBoard.create({
            daily_quiz_id: dailyQuiz,
            leaderboard: leaders
        });
    } catch (error) {
        return false;
    }
}

module.exports = router;