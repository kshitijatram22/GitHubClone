const createIssue = (req, res) => {
    res.send("Issue Created");
}
const updateIssueById = (req, res) => {
    res.send("Issue updated");
}
const deleteIssueById = (req, res) => {
    res.send("Issue deleted");
}
const fetAllIssues = (req, res) => {
    res.send("all Issue fetched");
}
const getIssuesById = (req, res) => {
    res.send("Issue fetched by Id");
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    fetAllIssues,
    getIssuesById,
}