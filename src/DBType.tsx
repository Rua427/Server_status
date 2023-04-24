export type ServerList = {
    IP : string,
    ID : string,
    PW : string,
    server_name: string,
    server_category: string,
};

export type ServerResult = {
    IP : string,
    server_category: string,
    Year : number,
    Week : number,
    CPU_Usage: number,
    Memory_Usage: number,
    Disk_Usage: number,
    CPU_Temp: number,
    VNFD:string,
    GPS:string
}

export const list: ServerList[] = [{
    IP: "",
    ID: "",
    PW: "",
    server_name: "",
    server_category: ""
}];

export const serverResult: ServerResult[] = [{
    IP : "",
    server_category: "",
    Year : 0,
    Week : 0,
    CPU_Usage: 0,
    Memory_Usage: 0,
    Disk_Usage: 0,
    CPU_Temp: 0,
    VNFD:"",
    GPS:"",
}]
