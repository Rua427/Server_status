import {ServerResult} from './DBType'

export type CheckStatus = {
    result: number,
    reason: string[],
}


export const checkServerStatus = (serverStatus: ServerResult) => {
    let check: number = 0;
    let checking: CheckStatus = {
        result: 0,
        reason: [],
    };

    if(serverStatus.CPU_Temp > 0.9) { check < 2 ? 2 : check; checking.reason.push("CPU Temp is too high")}
    if(serverStatus.CPU_Usage > 0.9) { check < 2 ? 2 : check; checking.reason.push("CPU Usage is too a lot")}
    if(serverStatus.Disk_Usage > 0.9) { check < 2 ? 2 : check; checking.reason.push("Disk Usage is too a lot")}
    if(serverStatus.Memory_Usage > 0.9) { check < 2 ? 2 : check; checking.reason.push("Memory Usage is too a lot")}
    if(serverStatus.GPS === "bad") { check < 2 ? 2 : check; checking.reason.push("vDU GPS stats is wrong") }
    if(serverStatus.VNFD === "bad") { check < 2 ? 2 : check; checking.reason.push("vDU VNFD state is wrong")}
    if(serverStatus.CPU_Temp > 0.8 && serverStatus.CPU_Temp <= 0.9) { check < 1 ? 1 : check; checking.reason.push("CPU Temp is high")}
    if(serverStatus.CPU_Usage > 0.8 && serverStatus.CPU_Usage <= 0.9) { check < 1 ? 1 : check; checking.reason.push("CPU Usage is a lot")}
    if(serverStatus.Disk_Usage > 0.8 && serverStatus.Disk_Usage <= 0.9) { check < 1 ? 1 : check; checking.reason.push("Disk Usage is a lot")}
    if(serverStatus.Memory_Usage > 0.8 && serverStatus.Memory_Usage <= 0.9) { check < 1 ? 1 : check; checking.reason.push("Memory Usage is a lot")}

    checking.result = check;

    return checking;
}