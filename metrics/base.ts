import * as si from "systeminformation";

export async function baseInfo() {
    const os = await si.osInfo();
    const cpu = await si.cpu();
    const currentLoad = await si.currentLoad();
    const time = si.time();
    const memory = await si.mem();

    return {
        platform: os.platform,
        distro: os.distro,
        release: os.release,
        codename: os.codename,
        kernel: os.kernel,
        arch: os.arch,
        memory: {
            used: memory.used,
            total: memory.total,
            free: memory.free,
        },
        cpu: {
            currentLoad: currentLoad.currentLoad,
            cores: cpu.cores,
            physicalCores: cpu.physicalCores,
        },
        uptime: time.uptime,
    }
}