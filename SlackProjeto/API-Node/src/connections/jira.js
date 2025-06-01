const axios = require('axios');

const jiraClient = axios.create({
  baseURL: process.env.JIRA_URL,
  auth: {
    username: process.env.JIRA_EMAIL,
    password: process.env.JIRA_TOKEN
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

module.exports = jiraClient;
