import * as si from "systeminformation";

export async function fsSizeInfo() {
    const fileSize = await si.fsSize('/');
    console.debug('fileSize', fileSize)
    return false;
}