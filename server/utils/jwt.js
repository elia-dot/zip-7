import jwt from 'jsonwebtoken';

export const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
}
export const verifyToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

