require("dotenv").config();
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const nonSecurePaths = [
  "/api/login",
  "/api/top-doctor-home",
  "/api/get-detail-doctor-by-id",
  "/api/logout",
  "/api/get-schedule-doctor-by-date",
  "/api/delete-past-schedule-doctor",
  "/api/get-past-doctor-schedule",
  "/api/get-profile-doctor-by-id",
  "/api/get-gender-patient",
  "/api/verify-book-appointment",
  "/api/forgot-password",
  "/api/reset-user-password",
  "/api/get-all-specialties",
  "/api/get-detail-specialty-by-id",
  "/api/get-province-specialty",
  "/api/get-all-clinics",
  "/api/get-detail-clinic-by-id",
  "/api/get-list-patient-for-doctor",
];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: "24h",
    });
  } catch (e) {
    console.log(e);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return decoded;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookie = req.cookies;
  let tokenFromHeader = extractToken(req);
  if ((cookie && cookie.jwt) || tokenFromHeader) {
    let token = cookie.jwt ? cookie.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.data = decoded;
      next();
    } else {
      res.status(401).json({
        errCode: -2,
        errMessage: "Not authenticated User!",
      });
    }
  } else {
    res.status(401).json({
      errCode: -2,
      errMessage: "Not authenticated User!",
    });
  }
};

const checkUserPermisson = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.data) {
    let tokenFromHeader = extractToken(req);
    let permissions = jwtDecode(tokenFromHeader).user.roleData.permissionData;
    let currentUrl = req.path;
    if (!permissions || permissions.length === 0) {
      res.status(403).json({
        errCode: -4,
        errMessage: "You dont't have permission to access this resource!",
      });
    }
    let canAccess = permissions.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      res.status(403).json({
        errCode: -4,
        errMessage: "You dont't have permission to access this resource!",
      });
    }
  } else {
    res.status(401).json({
      errCode: -2,
      errMessage: "Not authenticated User!",
    });
  }
};

export { createJWT, verifyToken, checkUserJWT, checkUserPermisson };
