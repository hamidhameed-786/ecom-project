import userModel from "../model/userdata.model.js";
import bcrypt from "bcrypt";
import cryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

// =========================
//  USER REGISTRATION
// =========================
export const doregister = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists!" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const userDetail = await userModel.create({
      username,
      email,
      password: password_hash,
      phone,
    });

    return res.status(201).json({
      ok: true,
      message: "User registration successful",
      userDetail,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =========================
//  USER LOGIN
// =========================
const sessionKeys = {};

export const dologin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ ok: false, message: "Email not found!" });
    }

    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return res.status(400).json({ ok: false, message: "Password not match" });
    }
    // create session
    const dynamicKey = cryptoJS.lib.WordArray.random(16).toString();
    const sessionId = uuidv4();
    const encryptedMail = cryptoJS.AES.encrypt(email, dynamicKey).toString();

    sessionKeys[sessionId] = { dynamicKey, encryptedEmail: encryptedMail };

    return res.status(200).json({
      ok: true,
      message: "Login Successful",
      userEmail: { sessionId },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =========================
//  USER PROFILE
// =========================
export const Profile = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionKeys[sessionId]) {
      return res
        .status(404)
        .json({ ok: false, message: "Invalid session ID OR session expired" });
    }

    const { dynamicKey, encryptedEmail } = sessionKeys[sessionId];

    const decryptedMail = cryptoJS.AES.decrypt(
      encryptedEmail,
      dynamicKey
    ).toString(cryptoJS.enc.Utf8);

    if (!decryptedMail) {
      return res
        .status(400)
        .json({ ok: false, message: "Email decryption failed" });
    }

    const user = await userModel.findOne({ email: decryptedMail });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "User email not found" });
    }

    return res.json({
      ok: true,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =========================
//  USER LOGOUT
// =========================

export const Logout = (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionKeys[sessionId]) {
      return res
        .status(400)
        .json({ ok: false, message: "Session Id Not Found" });
    } else {
      delete sessionKeys[sessionId];
      return res.status(200).json({ ok: true, message: "logout successful" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
