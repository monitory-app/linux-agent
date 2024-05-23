import * as si from "systeminformation";

export async function fsSizeInfo() {
    const fileSize = await si.fsSize();
    const mount = fileSize.find((fs: any) => fs.mount === '/');

    console.debug('fileSize', mount);
    return {
        fsSize: mount ?? null
    };
}