const DailyQuiz = require('../models/dailyQuiz');
const MultipleChoiceQuestion = require('../models/multipleChoiceQuestion');
// Default size of quiz
const DEF_QUIZ_SIZE = 20;


async function generateDailyQuestions(CATEGORY) {
    try {

        CATEGORY.forEach(async element => {
            const dailyQuiz = await DailyQuiz.create({
                quiz_length: 20,
                category: element
            });
            filter = { category: element };

            let multipleChoiceQuestion = await MultipleChoiceQuestion.aggregate([{
                    $project: {
                        author: 0,
                        createdAt: 0,
                        updatedAt: 0
                    }
                },
                {
                    $match: filter
                }
            ]).sample(20)

            dailyQuiz.questions = multipleChoiceQuestion
            await dailyQuiz.save();

        });
        return true
    } catch (error) {
        logger.error(error);
        return false
    }
}