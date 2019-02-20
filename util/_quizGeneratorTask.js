var cron = require('node-cron');

const quizGenerator = require('./_quizGenerator')

const CATEGORY = ['None', 'Quantitative Aptitude', 'Mental Ability & Test of Reasoning',
    'General Science', 'Current Affairs', 'Facts About India',
    'General Awareness', 'Kerala Facts + Renaissance', 'Constitution Of India',
    'General English', 'Malayalam', 'Information Technology and Cyber Laws'
];

const weekelyQuiz = cron.schedule('0 0 * * sat', () => {
    console.log('Generating weekly quiz');
});

const dailyQuiz = cron.schedule('0 0 * * *', () => {
    console.log('Generating daily quiz');
    const quizGenerated = quizGenerator.generateDailyQuestions(CATEGORY);
    if (quizGenerated)
        console.log('Daily quiz generated');
    else
        console.log('Daily quiz generated failed');
});



module.exports = { weekelyQuiz, dailyQuiz }