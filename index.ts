import {serve} from 'bun';
import {aptUpdates} from "./utils/apt.ts";
import {hardwareInfo} from "./utils/hardware.ts";
import {Hono} from 'hono'
import {bearerAuth} from 'hono/bearer-auth'
import packageJson from "./package.json";

const PORT = Bun.env.PORT ?? '2003';

console.debug(`Server is running on http://localhost:${PORT} and ws://localhost:${PORT}`);
const app = new Hono();
const token = Bun.env.TOKEN;

// It will validate token
app.use("*", bearerAuth({
    verifyToken: async (t, c) => {
        return t === token;
    },
}));

app.get("/", async (c) => {
    const {normalUpdates, securityUpdates} = await aptUpdates();
    const {cpuInPercent, memoryInPercent, uptime} = await hardwareInfo();

    return c.json({
        cpuInPercent,
        memoryInPercent,
        uptime,
        normalUpdates,
        securityUpdates,
        version: packageJson.version,
    });
});

export default app;