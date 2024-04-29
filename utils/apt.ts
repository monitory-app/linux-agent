import {execSync} from "child_process";

export function aptUpdates() {
    const startTime = Date.now();
    return new Promise<{ normalUpdates: number; securityUpdates: number; duration?: number; }>((resolve, reject) => {
        try {
            // Führen Sie 'apt update' aus, um die Paketliste zu aktualisieren
            execSync('apt update', {stdio: 'inherit'});

            // Führen Sie 'apt list --upgradable' aus, um nach verfügbaren Updates zu suchen
            const output = execSync('apt list --upgradable').toString();

            // Teilen Sie die Ausgabe in Zeilen auf
            const lines = output.split('\n');

            // Zählen Sie die Anzahl der normalen und Sicherheitsupdates
            let normalUpdates = 0;
            let securityUpdates = 0;

            for (const line of lines) {
                // Überprüfen Sie, ob die Zeile ein Upgrade-Eintrag ist
                if (line.includes('upgradable')) {
                    // Überprüfen Sie, ob die Zeile Sicherheitsupdates enthält
                    if (line.includes('security')) {
                        securityUpdates++;
                    } else {
                        normalUpdates++;
                    }
                }
            }

            const duration = Date.now() - startTime;
            console.log(`aptUpdates took ${duration}ms`);
            resolve({normalUpdates, securityUpdates, duration});
        } catch (error) {
            const duration = Date.now() - startTime;
            console.log(`aptUpdates took ${duration}ms`);
            resolve({normalUpdates: 0, securityUpdates: 0, duration});
        }
    });
}