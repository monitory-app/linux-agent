import * as si from "systeminformation";

export async function processesInfo() {
    const processes = await si.processes();

    return {
        processes: {
            all: processes.all,
            running: processes.running,
            blocked: processes.blocked,
            sleeping: processes.sleeping,
            unknown: processes.unknown,
        }
    };
}