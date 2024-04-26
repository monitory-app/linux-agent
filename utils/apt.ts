import {execSync} from "child_process";

export function aptUpdates() {
    return new Promise<{ normalUpdates: number; securityUpdates: number; }>((resolve, reject) => {
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

            resolve({normalUpdates, securityUpdates});
        } catch (error) {
            resolve({normalUpdates: 0, securityUpdates: 0});
        }
    });
}