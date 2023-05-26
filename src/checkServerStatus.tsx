import {serverResult, ServerResult} from './DBType'

export type CheckStatus = {
    result: number,
    reason: string[],
}
export type StatusCount = {
    good: number,
    warning: number,
    bad: number,
    disconnect: number,
}

export const checkServerStatus = (serverStatus: ServerResult) => {
    let check: number = 0;
    let checking: CheckStatus = {
        result: 0,
        reason: [],
    };

    if(serverStatus.Connect == false) {
        checking.reason.push("Disconnect");
        checking.result = 3;
        return checking; 
    }
    if(serverStatus.CPU_Temp > 90) { check = check < 2 ? 2 : check; checking.reason.push("CPU Temp is too high"); }
    if(serverStatus.CPU_Usage > 0.9) { check = check < 2 ? 2 : check; checking.reason.push("CPU Usage is too a lot"); }
    if(serverStatus.Disk_Usage > 0.9) { check = check < 2 ? 2 : check; checking.reason.push("Disk Usage is too a lot"); }
    if(serverStatus.Memory_Usage > 0.9) { check = check < 2 ? 2 : check; checking.reason.push("Memory Usage is too a lot"); }
    if(serverStatus.GPS === "bad") { check = check < 2 ? 2 : check; checking.reason.push("vDU GPS stats is wrong"); }
    if(serverStatus.VNFD === "bad") { check = check < 2 ? 2 : check; checking.reason.push("vDU VNFD state is wrong"); }
    if(serverStatus.CPU_Temp > 80 && serverStatus.CPU_Temp <= 90) { check = check < 1 ? 1 : check; checking.reason.push("CPU Temp is high"); }
    if(serverStatus.CPU_Usage > 0.8 && serverStatus.CPU_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.reason.push("CPU Usage is a lot"); }
    if(serverStatus.Disk_Usage > 0.8 && serverStatus.Disk_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.reason.push("Disk Usage is a lot"); }
    if(serverStatus.Memory_Usage > 0.8 && serverStatus.Memory_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.reason.push("Memory Usage is a lot"); }

    checking.result = check;

    return checking;
}
export const checkEachServerStatus = (serverStatus: ServerResult[], category: string) => {
    let check: number = 0;
    let checking: StatusCount = {
        good: 0,
        warning: 0,
        bad: 0,
        disconnect: 0,
    };
    serverStatus.map((res) => {
        check = 0;
        if(category === res.server_category){
            if(res.Connect == false) { checking.disconnect++; return; }
            if(res.CPU_Temp > 90) { check = check < 2 ? 2 : check; }
            if(res.CPU_Usage > 0.9) { check = check < 2 ? 2 : check; }
            if(res.Disk_Usage > 0.9) { check = check < 2 ? 2 : check;  }
            if(res.Memory_Usage > 0.9) { check = check < 2 ? 2 : check;  }
            if(res.GPS === "bad") { check = check < 2 ? 2 : check; }
            if(res.VNFD === "bad") { check = check < 2 ? 2 : check;  }
            if(res.CPU_Temp > 80 && res.CPU_Temp <= 90) { check = check < 1 ? 1 : check; }
            if(res.CPU_Usage > 0.8 && res.CPU_Usage <= 0.9) { check = check < 1 ? 1 : check; }
            if(res.Disk_Usage > 0.8 && res.Disk_Usage <= 0.9) { check = check < 1 ? 1 : check; }
            if(res.Memory_Usage > 0.8 && res.Memory_Usage <= 0.9) { check = check < 1 ? 1 : check; }
            
            if(check == 2){
                checking.bad ++;
            }
            else if(check == 1){
                checking.warning++;
            }
            else{
                checking.good++;
            }
        }
    })

    return checking;
}


export const checkServerEachItemStatus = (serverStatus: ServerResult[], category: string, item: string) => {
    let check: number = 0;
    let checking: StatusCount = {
        good: 0,
        warning: 0,
        bad: 0,
        disconnect: 0,
    };
    serverStatus.map((res) => {
        if(category === res.server_category){
            if(res.Connect == false){
                checking.disconnect++;
                return;
            }

            if(item === "CPU_Temp") {
                if(res.CPU_Temp > 90) { check = check < 2 ? 2 : check; checking.bad++}
                else if(res.CPU_Temp > 80 && res.CPU_Temp <= 90) { check = check < 1 ? 1 : check; checking.warning++; }
                else{checking.good++;}
            }
            else if(item === "CPU_Usage") {
                if(res.CPU_Usage > 0.9) { check = check < 2 ? 2 : check; checking.bad++}
                else if(res.CPU_Usage > 0.8 && res.CPU_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.warning++; }
                else{checking.good++;}
            }
            else if(item === "Disk_Usage") {
                if(res.Disk_Usage > 0.9) { check = check < 2 ? 2 : check; checking.bad++}
                else if(res.Disk_Usage > 0.8 && res.Disk_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.warning++; }
                else{checking.good++;}
            }
            else if(item === "Memory_Usage") {
                if(res.Memory_Usage > 0.9) { check = check < 2 ? 2 : check; checking.bad++}
                else if(res.Memory_Usage > 0.8 && res.Memory_Usage <= 0.9) { check = check < 1 ? 1 : check; checking.warning++; }
                else{checking.good++;}
            }
            else if(item === "GPS"){
                if(res.GPS === "bad") { check = check < 2 ? 2 : check; checking.bad++; }
                else{checking.good++;}
            }
            else if(item === "VNFD" ){
                if(res.VNFD === "bad") { check = check < 2 ? 2 : check; checking.bad++; }
                else{checking.good++;}
            }
        }
    })

    return checking;
}
