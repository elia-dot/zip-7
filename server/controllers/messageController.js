import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { message, from, to, subject } = req.body;
    let newMessage = new Message({
      subject,
      message,
      from,
      to,
    });
    await newMessage.save();
    newMessage = await Message.findOne({ _id: newMessage._id })
      .populate('from')
      .populate('to');
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      to: req.user._id,
    })
      .populate('from')
      .populate('to');
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message)
      return res
        .status(404)
        .json({ success: false, error: 'Message not found' });
    if (
      message.from.toString() !== req.user._id.toString() &&
      req.user.role !== 'master'
    )
      return res.status(401).json({ success: false, error: 'Not authorized' });
    await message.remove();
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const readMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message)
      return res
        .status(404)
        .json({ success: false, error: 'Message not found' });
    if (message.to.toString() !== req.user._id.toString())
      return res.status(401).json({ success: false, error: 'Not authorized' });
    message.isRead = true;
    await message.save();
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
