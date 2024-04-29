import * as si from "systeminformation";

export async function dockerInfo() {
    if (process.platform === 'darwin') {
        return {
            docker: {
                version: 'N/A',
                containers: 0,
                containersRunning: 0,
                containersPaused: 0,
                containersStopped: 0,
                duration: 0,
            }
        };
    }

    const startTime = Date.now();
    const docker = await si.dockerInfo();
    const duration = Date.now() - startTime;

    return {
        docker: {
            version: docker.serverVersion,
            containers: docker.containers,
            containersRunning: docker.containersRunning,
            containersPaused: docker.containersPaused,
            containersStopped: docker.containersStopped,
            duration,
        }
    };
}