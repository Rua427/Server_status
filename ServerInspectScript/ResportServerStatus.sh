#!/bin/bash

#점검할 서버의 계정을 가져온다.  배열로
ip=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v IP | awk '{ print $1 }'`);
id=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v ID | awk '{ print $2 }'`);
pw=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v PW | awk '{ print $3 }'`);
server_category=(`mysql -u cdma -e "select server_category from server_status.server_info" | grep -v server_category`);

# 서버 길이를 저장
server_length=${#ip[@]};

input_DB(){
    
    year=`date +%Y`
    week=`date +%W`
    mon=`date +%m`
    day=`date +%d`

    t=`date +%T`
    #password
        mysql -u root -p -e "insert into \`server_status\`.\`server_status_result\` (IP, server_category, Year, Week, CPU_Usage, Memory_Usage, Disk_Usage, CPU_Temp, VNFD, GPS, Connect, Update_Time)
                    values('$1', '$2', $year, $week, $3, $4, $5/100.0, $6, '$7', '$8', $9, '$year-$mon-$day $t')
                    on duplicate key update CPU_Usage=$3, Memory_Usage=$4, Disk_Usage=$5/100.0, CPU_Temp=$6, VNFD='$7', GPS='$8', Connect=$9, Update_Time='$year-$mon-$day $t'"
    unset year
    unset week
}

for ((i=0; i<$server_length; i++)) do
    DISK_USAGE='0'
    CPU_USAGE='0'
    MEM_USAGE='0'
    CPU_TEMP='0'
    GPS_STATUS='NONE'
    VNFD_STATUS='NONE'

    #Disk 사용율 계산
    DISK_USAGE=`timeout 5 /root/Server/Server_Status/ServerInspectScript/GetDiskUsage.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk 'END { print $5 }' | awk 'sub(/\015/,"");'`

    if [ "$DISK_USAGE" = "Ter" ]; then
        DISK_USAGE='0'
        input_DB ${ip[$i]} ${server_category[$i]} ${CPU_USAGE} ${MEM_USAGE} ${DISK_USAGE} ${CPU_TEMP} ${VNFD_STATUS} ${GPS_STATUS} '0'
        continue
    fi

    if [ ! -n "$DISK_USAGE"  ]; then
        DISK_USAGE='0'
        input_DB ${ip[$i]} ${server_category[$i]} ${CPU_USAGE} ${MEM_USAGE} ${DISK_USAGE} ${CPU_TEMP} ${VNFD_STATUS} ${GPS_STATUS} '0'
        continue
    fi

    # Memory 사용률 계산
    useMem=`/root/Server/Server_Status/ServerInspectScript/GetMemoryUsage.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk '$1 == "MemFree:" || $1 == "SwapFree:" || $1 == "Cached:" || $1 == "SwapCached" || $1 == "Buffers" { sum += $2 } END { print sum }'`
    totalMem=`/root/Server/Server_Status/ServerInspectScript/GetMemoryUsage.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk '$1 == "MemTotal:" || $1 == "SwapTotal:"{ sum += $2 } END { print sum }'`
    
    MEM_USAGE=`echo "scale=2; 1 - ($useMem) / ($totalMem)" | bc -l`

    unset useMEM
    unset totalMem
    #CPU 온도 계산
    command=("cat /sys/class/thermal/thermal_zone*/temp"
             "cat /sys/class/hwmon/hwmon*/temp*_input"
             "cat /sys/class/hwmon/hwmon*/device/temp_input");

    CPU_TEMP='0'

    for((c=0; c<${#command[@]}; c++)) do
        temp_res=(`/root/Server/Server_Status/ServerInspectScript/GetCPUTEMP.exp ${ip[$i]} ${id[$i]} ${pw[$i]} "${command[c]}" | sed -n '/pass/,$p' | grep -v pass | sed 's/\(.\)...$//' | sort -rnsk 1 | head -1 | awk 'sub(/\015/,"");'`)
        # 값이 있으면 true를 반환
        if [ -n "$temp_res" ]; then
            CPU_TEMP=$temp_res;
            break;
        fi
    done

    unset temp_res
    #CPU 사용률 계산
    CPU_USAGE=`/root/Server/Server_Status/ServerInspectScript/GetCPUUsage.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk '{sum += $15} END { print ((100-(sum/(NR-2)))*0.01) }'`

    #VNFD 상태 확인
    if [ ${server_category[$i]} = "vDU" ]; then
        vnfd=(`/root/Server/Server_Status/ServerInspectScript/GetVNFDStatus.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk '/adpf/' | awk '$3 != "Running" { print "Fail" }'`)
        # 정상이면 값이 없어야함
        if [ -n "${vnfd[@]}" ]; then
            VNFD_STATUS='GOOD'
        else
            VNFD_STATUS='FAIL'
        fi
    fi

    #GPS 상태 확인
    if [ ${server_category[$i]} = "vDU" ]; then
        gps=`/root/Server/Server_Status/ServerInspectScript/GetVNFDStatus.exp ${ip[$i]} ${id[$i]} ${pw[$i]} | sed -n '/pass/,$p' | grep -v pass | awk '{if ( index($0, "PPS")!=0 || index($0, "GNSS")!=0 ) print $0 }'`
        
        if [ -n "${gps}" ]; then
            GPS_STATUS='GOOD'
        else
            GPS_STATUS='FAIL'
        fi
    fi

    input_DB ${ip[$i]} ${server_category[$i]} ${CPU_USAGE} ${MEM_USAGE} ${DISK_USAGE} ${CPU_TEMP} ${VNFD_STATUS} ${GPS_STATUS} '1'

    unset DISK_USAGE

done
