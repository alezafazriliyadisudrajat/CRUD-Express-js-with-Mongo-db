const db = require('../models')
const Post = db.posts

// Get all
exports.findAll = (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving posts"
        })
    });
}

// Create 
exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    })

    post.save(post)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create posts."
        })
    })
}

// Get by id
exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show post."
        });
    });
};

//Update data
exports.update = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    message: "Data not found"
                });
            }

            return res.send({
                message: "Data successfully updated"
            });
        })
        .catch((err) => {
            return res.status(409).send({
                message: err.message || "Some error while updating post."
            });
        });
};

//delete data
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findOneAndDelete({ _id: id })
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    message: "Data not found"
                });
            }

            return res.send({
                message: "Data successfully deleted"
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while deleting data."
            });
        });
};
