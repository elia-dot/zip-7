import Log from '../models/Log.js';

export const createLog = async (action, creatorId, actionOnId) => {
  const model =
    action === 'login' ||
    action === 'signup' ||
    action === 'create user' ||
    action === 'update user' ||
    action === 'block user' ||
    action === 'unblock user'
      ? 'User'
      : action === 'create company' || action === 'update company'
      ? 'Company'
      : action === 'create report' || action === 'update report'
      ? 'Report'
      : 'Review';

  const actionOn =
    model === 'User'
      ? { user: actionOnId }
      : model === 'Company'
      ? { company: actionOnId }
      : model === 'Report'
      ? { report: actionOnId }
      : { review: actionOnId };

  const log = new Log({
    action,
    creator: creatorId,
    actionOn,
    docModel: model,
  });
  await log.save();
};

export const getLogs = async (req, res) => {
  const logs = await Log.find();
  return res.status(200).json({ success: true, logs });
};
