import {aptUpdates} from "./apt.ts";
import {dockerInfo} from "./docker.ts";
import {baseInfo} from "./base.ts";
import {rebootInfo} from "./reboot.ts";
import {fsSizeInfo} from "./fs-size.ts";
import {processesInfo} from "./processes.ts";

export async function getAllMetrics() {
    const raw = await Promise.allSettled([
        baseInfo(),
        aptUpdates(),
        dockerInfo(),
        rebootInfo(),
        processesInfo(),
        fsSizeInfo(),
    ]);

    return raw.flatMap((value: any) => value.value).reduce((acc, obj) => {
        return {...acc, ...obj};
    }, {});
}