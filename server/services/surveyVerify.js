var _ = require('lodash');
var verifySurvery = function(questions, originQuestions) {
	_.map(questions, function(question) {
		var theOrigin = _.find(originQuestions, function(originQuestion) {
			return originQuestion.choice === question.choice;
		});
		if (question.answer === theOrigin.answer) {
			question.correct = true;
		} else {
			question.correct = false;
		}
	});
	return questions;
};


exports.verifySurvery = verifySurvery;
