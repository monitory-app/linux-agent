import * as si from "systeminformation";

export async function dockerInfo() {
    if (process.platform === 'darwin') {
        return {
            docker: {
                version: 'N/A',
                containers: [],
                containersCount: 0,
                containersRunningCount: 0,
                containersPausedCount: 0,
                containersStoppedCount: 0,
                duration: 0,
            }
        };
    }

    const startTime = Date.now();
    const docker = await si.dockerInfo();
    const duration = Date.now() - startTime;
    const containerStats = await si.dockerAll();

    return {
        docker: {
            version: docker.serverVersion,
            containers: containerStats.map((container: any) => {
                return {
                    id: container?.id,
                    name: container?.name,
                    memPercent: container?.memPercent ? Number(container?.memPercent.toFixed(2)) ?? 0 : 0,
                    cpuPercent: container?.cpuPercent ? Number(container?.cpuPercent.toFixed(2)) ?? 0 : 0,
                    state: container?.state,
                    started: container?.started,
                    restartCount: container?.restartCount ?? 0,
                }
            }),
            containersCount: docker.containers,
            containersRunningCount: docker.containersRunning,
            containersPausedCount: docker.containersPaused,
            containersStoppedCount: docker.containersStopped,
            duration,
        }
    };
}