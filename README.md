# Mismatched Quiz Points
### *Package Name*: mismatched-quiz-points
### *Child Type*: pre import
### *Platform*: all
### *Required*: required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

Identifies quizzes that had a total point value different than their grade item. This means the quiz will have a different point value in Canvas, since Canvas uses the quiz's point values for its grading.

## How to Install

```
npm install --save byuitechops/mismatched-quiz-points
```

## Run Requirements

None

## Options

None

## Outputs

None

## Process

Describe in steps how the module accomplishes its goals.

1. Identify quizzes from course export
2. Identify grade items from course export
3. For each quiz...
4. Identify quiz's corresponding grade item
5. Identify quiz point total
6. Identify grade item value
7. If different, log it

## Log Categories

List the categories used in logging data in your module.

- Quiz Value Different in Canvas vs. D2L