import * as dislikesDao from "./dislikes-dao.js";

const DislikesController = (app) => {
    const userDislikesDetail = async(req, res) => {
        const userId = req.params.uid;
        const detailId = req.params.did;
        const foundDislikes = await dislikesDao.findDislikedOrNotByUser(userId, detailId);
        if (foundDislikes.length > 0) {
            console.log("already disliked");
        } else {
            const disLike = await dislikesDao.userDislikesDetail(userId, detailId);
            res.json(disLike)
        }
    }
    const findDislikesByUserId = async (req, res) => {
        const userId = req.params.uid;
        const dislikes = await dislikesDao.findDislikesByUserId(userId);
        res.json(dislikes);
    }

    const findDislikedOrNotByUser =  async (req, res) => {
        const userId = req.params.uid;
        const detailId = req.params.did;
        const disliked = await dislikesDao.findDislikedOrNotByUser(userId, detailId);
        res.json(disliked)
    }

    const userRevertDislikesDetail = async(req, res) => {
        const userId = req.params.uid;
        const detailId = req.params.did;
        const foundDislikes = await dislikesDao.findDislikedOrNotByUser(userId, detailId);
        if (foundDislikes.length > 0) {
            console.log("found disliked");
            const disLike = await dislikesDao.userRevertDislikesDetail(userId, detailId);
            res.json(disLike)
        } else {
            console.log("Not disliked yet!")
        }
    }

    app.post("/api/users/:uid/dislikes/details/:did", userDislikesDetail);
    app.get("/api/users/:uid/dislikes", findDislikesByUserId);
    app.get("/api/users/:uid/dislikes/details/check/:did", findDislikedOrNotByUser);
    app.delete("/api/users/:uid/dislikes/revert/details/:did", userRevertDislikesDetail);
}

export default DislikesController;