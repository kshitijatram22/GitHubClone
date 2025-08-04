const createRepository = (req, res) => {
    res.send("Repository Created");
}
const getAllRepositories = (req, res) => {
    res.send("All Repositories fetched");
}
const fetchReposioryById = (req, res) => {
    res.send("Repository Fetched by Id");
}
const fetchReposioryByName = (req, res) => {
    res.send("Repository fetched by name");
}
const fetchRepositoryForCurrentUser = (req, res) => {
    res.send("Repository fetched for logged in user");
}
const updateRepositoryById = (req, res) => {
    res.send("Repository Updated");
}
const toggleVisibilityById = (req, res) => {
    res.send("Repository Created");
}
const deleteRepositoryById = (req, res) => {
    res.send("Repository Created");
}

module.exports = {
    createRepository,
    getAllRepositories,
    fetchReposioryById,
    fetchReposioryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
}