import * as si from "systeminformation";

export async function hardwareInfo() {
    const startTime = Date.now();
    const cpu = await si.currentLoad();
    const time = await si.time();
    const memory = await si.mem();

    const usedRam = Math.round(memory.used / 1024 / 1024 / 1024);
    const totalRam = Math.round(memory.total / 1024 / 1024 / 1024);
    const uptime = Math.round(time.uptime / 60 / 60);
    const memoryInPercent = ((usedRam / totalRam) * 100).toFixed(2) ?? 0;
    const cpuInPercent = cpu.currentLoad.toFixed(2) ?? 0;

    const duration = Date.now() - startTime;
    console.log(`hardwareInfo took ${duration}ms`);

    return {
        cpuInPercent,
        memoryInPercent,
        uptime,
        duration
    };
}