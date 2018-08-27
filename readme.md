# Job Evaluator - Help You Read Job Descriptions 10X Faster

## Background

As job seekers, we often find ourselves wasting a lot of time by clicking into jobs descriptions that does not fit our skills/interests.
So we created Job Evaluator, a Chrome Extension that evaluates job descriptions for users, let them see the “suitability score” for job descriptions before they start reading them -- evaluated based on how much do the user’s skill sets and interests fit with the job descriptions.

## Functionality:

- [ ] Access the trendy skills api to get an up-to-date list of tech skills to be searched for in job descriptions

- [ ] Provide the user with an input field to search and select skills compiled from the api
- [ ] allow manually inputted skills that may not be on the list

- [ ] Scan a job description’s webpage for the skills from the api’s skill list and user inputted skills

- [ ] generate a score based on the matches and similarities of the user’s selected skills and the actual number of skills written in the job description.

- [ ] list out the relevant, related, and irrelevant skills they have compared to the job description.

- [ ] provide the ability to create an account so users can save the jobs they are interested in and have a list of skills shared by their saved job descriptions in order to efficiently gain skills to increase their chances of getting their preferred jobs.

![](https://i.imgur.com/6zxbaK9.png)

## MVP List:

### End of Weekend
- [ ] Finish proposal and have it posted on the github  repository’s README.md
- [ ] Individually finish the tutorial for chrome extension creation
### MVP 1 (Day1):
- [ ] Able searches through page to find and count number of appearances of keywords
- [ ] Able to display score on Icon/pop-up menu/or on top of webpage.
- [ ] Able to get user input technical skills
### MVP 2 (Day2):
- [ ] setup express backend
- [ ] Able to get list of trending skills from API call
- [ ] Able to highlight keywords by group on the webpage.
- [ ] Able to add multiple category of skills
### MVP 3 (Day 3&4):
- [ ] Able to identify the job title, for storing into backend
- [ ] Able to store all the viewed job-postings into local storage
- [ ] Able to display history of jobs viewed in a separate webpage (with react)
- [ ] More complex searches
### MVP 4 (Day5&6):
- [ ] Enable Linkedin login
- [ ] store user data into mongoDB
