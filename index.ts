import {Hono} from 'hono'
import {bearerAuth} from 'hono/bearer-auth'
import {pushToMonitory} from "./base";
import {getAllMetrics} from "./metrics";

const PORT = Bun.env.PORT ?? '2003';

console.debug(`Server is running on http://localhost:${PORT}`);
const app = new Hono();
const token = Bun.env.TOKEN;
const isProduction = Bun.env.NODE_ENV === 'production';
let intervalInSec: number = Number(Bun.env.INTERVAL_IN_SECONDS);
if (isNaN(intervalInSec)) {
    intervalInSec = 60;
}
console.debug(`Interval in seconds: ${intervalInSec}`);

if (Bun.env.MODE === 'PUSH') {
    setInterval(async () => {
        await pushToMonitory();
    }, intervalInSec * 1000);
}

if (isProduction) {
// It will validate token
    app.use("*", bearerAuth({
        verifyToken: async (t, c) => {
            return t === token;
        },
    }));
}

app.get("/", async (c) => {
    const result = await getAllMetrics();
    return c.json(result);
});

export default app;