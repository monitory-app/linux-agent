import * as si from "systeminformation";

export async function fsSizeInfo() {
    const fileSize = await si.fsSize();
    const mount = fileSize.find((fs: any) => fs.mount === '/');

    return {
        fs: mount ?? null
    };
}