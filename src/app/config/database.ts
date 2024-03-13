import { connect } from "mongoose";
import { hasUncaughtExceptionCaptureCallback } from "process";

export async function startConnection() {
    await connect("mongodb://localhost:27017/erpbluemarlin", {});
    console.log("se conecto a la base de datos");
}



