import {existsSync} from 'fs';

export async function rebootInfo() {
    const filePath = '/var/run/reboot-required';
    return {
        rebootRequired: existsSync(filePath)
    };
}