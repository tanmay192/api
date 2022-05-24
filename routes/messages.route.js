const router = require("express").Router();
const schedule = require("node-schedule");
const Message = require("../models/Message");

// Create a message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Create scheduled message
router.post("/:dateTime", (req, res) => {
    const newMessage = new Message(req.body);

    const date = new Date(req.params.dateTime);
    const job = schedule.scheduleJob(date, async () => {
        try {
            const savedMessage = await newMessage.save();
            return res.status(200).json(savedMessage);
        } catch (err) {
            return res.status(500).json(err);
        } finally {
            job.cancel();
        }
    });
});

// Get messages
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
