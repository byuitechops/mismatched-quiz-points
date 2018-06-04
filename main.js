module.exports = (course, stepCallback) => {

    /**************************************************************************************
     * Process:
     * 1. Identify quizzes from course export
     * 2. Identify grade items from course export
     * 3. For each quiz...
     * 4. Identify quiz's corresponding grade item
     * 5. Identify quiz point total
     * 6. Identify grade item value
     * 7. If different, log it
     *************************************************************************************/

    let quizFiles = course.content.filter(item => item.name.includes('quiz_d2l_'));

    let grades = course.content.find(item => item.name === 'grades_d2l.xml');

    quizFiles.forEach(quizFile => {
        // Quiz File
        let $ = quizFile.dom;
        // Grades File
        let $$ = grades.dom;

        // Reference to grade item
        let gradeItemRef = $('grade_item').text();
        // Grade item in the grades file
        let gradeItem = $$(`item[identifier="${gradeItemRef}"]`);
        // Get the total point value of the grade item
        let gradeValue = $$(gradeItem).find('out_of').eq(0).text();

        // Get the total point value of the quiz in the quiz file
        // Get itemrefs (points)
        // Get items    (qmd_weighting)

        let items = $('item').map((i, el) => {
            let fieldLabels = $(el).find('fieldlabel').get();
            let weightingEl = fieldLabels.find(fieldLabel => $(fieldLabel).text() === 'qmd_weighting');
            return $(weightingEl).next().text();
        }).get();

        let quizValue = items.reduce((acc, i) => acc += +i, 0);
        var reason = '';

        if (!gradeValue) {
            reason = 'There wasn\'t a grade item attached to this quiz, so the quiz\'s point value was set as a grade in the Canvas course.';
        } else if (+gradeValue !== quizValue) {
            reason = 'Grade Item Value and Quiz point total differ. The Quiz in Canvas is now worth what the Quiz totalled up to in D2L (not the grade item).';
        }

        if (reason !== '') {
            course.log('Quiz Value has Changed', {
                'Quiz': $('assessment').get(0).attribs.title,
                'Quiz Point Value': quizValue === undefined ? 'None' : quizValue,
                'Grade Item Value': gradeValue === '' ? 'None' : gradeValue,
                'Reason': ''
            });
        }
    });

    stepCallback(null, course);
};