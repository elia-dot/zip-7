import Log from '../models/Log.js';

export const createLog = async (action, creatorId, actionOnId) => {
  const log = new Log({
    action,
    creator: creatorId,
    actionOn: actionOnId,
  });
  await log.save();
};

export const getLogs = async (req, res) => {
  const logs = await Log.find();
  return res.status(200).json({ success: true, logs });
};
