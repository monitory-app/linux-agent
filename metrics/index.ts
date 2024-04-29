import {aptUpdates} from "./apt.ts";
import {dockerInfo} from "./docker.ts";
import {baseInfo} from "./base.ts";

export async function getAllMetrics() {
    const raw = await Promise.allSettled([
        baseInfo(),
        aptUpdates(),
        dockerInfo(),
    ]);

    return raw.flatMap((value: any) => value.value).reduce((acc, obj) => {
        return {...acc, ...obj};
    }, {});
}