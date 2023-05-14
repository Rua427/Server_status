import {ServerResult} from './DBType'

export type CheckStatus = {
    result: string,
    reason: string[],
}


export const checkServerStatus = (serverStatus: ServerResult) =>{

    let result: string = 'GOOD';
    if(serverStatus.CPU_Temp > 0.9) { }
    if(serverStatus.CPU_Temp > 0.9 && serverStatus.CPU_Temp <= 0.9) { }
    if(serverStatus.CPU_Temp <= 0.7) { }
    if(serverStatus.CPU_Usage > 0.9) { }
    if(serverStatus.CPU_Usage > 0.9 && serverStatus.CPU_Usage <= 0.9) { }
    if(serverStatus.CPU_Usage <= 0.7) { }
    if(serverStatus.Disk_Usage > 0.9) { }
    if(serverStatus.Disk_Usage > 0.9 && serverStatus.Disk_Usage <= 0.9) { }
    if(serverStatus.Disk_Usage <= 0.7) { }
    if(serverStatus.Memory_Usage > 0.9) { }
    if(serverStatus.Memory_Usage > 0.9 && serverStatus.Memory_Usage <= 0.9) { }
    if(serverStatus.Memory_Usage <= 0.7) { }
    if(serverStatus.GPS === "bad") { }
    if(serverStatus.VNFD === "bad") { }

    return result;
}