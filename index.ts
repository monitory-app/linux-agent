import {serve} from 'bun';
import {aptUpdates} from "./utils/apt.ts";
import {hardwareInfo} from "./utils/hardware.ts";

const PORT = Bun.env.PORT ?? '2003';

console.debug(`Server is running on http://localhost:${PORT} and ws://localhost:${PORT}`);
serve({
    port: PORT,
    async fetch(request) {

        const {normalUpdates, securityUpdates} = await aptUpdates();
        const {cpuInPercent, memoryInPercent, uptime} = await hardwareInfo();

        return new Response(
            JSON.stringify({
                cpuInPercent,
                memoryInPercent,
                uptime,
                normalUpdates,
                securityUpdates,
            })
        )
    }
});