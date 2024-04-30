import {getAllMetrics} from "../metrics";

export async function pushToMonitory() {
    const result = await getAllMetrics();
    const token = Bun.env.TOKEN;
    console.debug(`Pushing informations to monitory.app at ${new Date().toISOString()}`);

    try {
        const response = await fetch(`https://api.monitory.app/hosts/metrics/${token}`, {
            method: "POST",
            body: JSON.stringify(result),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.debug(`Pushed informations to monitory.app: ${response.status}`);
    } catch (error) {
        console.error(error);
    }
}