#!/bin/bash

#점검할 서버의 계정을 가져온다.  배열로
ip=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v IP | awk '{ print $1 }'`);
id=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v ID | awk '{ print $2 }'`);
pw=(`mysql -u cdma -e "select * from server_status.server_info" | grep -v PW | awk '{ print $3 }'`);
server_category=(`mysql -u cdma -e "select server_category from server_status.server_info" | grep -v server_category`);

# 서버 길이를 저장
server_length=${#ip[@]};

for (i=0; i<${server_length}; i++); do
    rm -rf /root/.ssh/known_hosts

    #Disk 사용율 계산
    DISK_USAGE=`ssh ${id[$i]}@${ip[$i]} "df | grep -v Used | sort -rnsk 5 | head -1 | awk '{ print \$5 }' | cut -d '%' -f1"`
    sleep 0.25
    yes
    sleep 0.25
    ${pw[$i]}


    # Memory 사용률 계산
    mem=`ssh ${id[$i]}@${ip[$i]} "cat /proc/meminfo"`
    expect {
        "yes/no"{
            send "yes\n"
            exp_continue
        }
        "password:"{
            send "${pw[$i]}\n"
        }   
    }
    memTotal=`awk '$1 == "MemTotal" { print $2}'`
    swapTotal=`awk '$1 == "SwapTotal" { print $2}'`
    memFree=`awk '$1 == "MemFree" { print $2}'`
    swapFree=`awk '$1 == "SwapFree" { print $2}'`
    memCache=`awk '$1 == "Cached" { print $2}'`
    swapCache=`awk '$1 == "SwapCached" { print $2}'`
    buffer=`awk '$1 == "Buffers" { print $2}'`

    MEM_USAGE=`echo "scale=2; 1 - ($buffer + $memFree + $swapFree + $memCache + $swapCache) / ($memTotal + $swapTotal)" | bc -l`

    #CPU 온도 계산
    command=("cat /sys/class/thermal/thermal_zone*/temp | sed 's/\(.\)..$//'"
             "cat /sys/class/hwmon/hwmon*/temp*_input | sed 's/\(.\)..$//'"
             "cat /sys/class/hwmon/hwmon*/device/temp*_input | sed 's/\(.\)..$//'");

    CPU_TEMP='0'

    for(c=0; c<${#command[@]}; c++) do
        temp_res=(`ssh ${id[$i]}@${ip[$i]} "$command | sort -rnsk 5 | head -1 | awk '{ print $1 }'"`)
        expect {
            "yes/no"{
                send "yes\n"
                exp_continue
            }
            "password:"{
                send "${pw[$i]}\n"
            }   
        }

        # 값이 있으면 true를 반환
        if [ -n "$temp_res" ]; then
            CPU_TEMP=$temp_res;
            break;
        fi
    done

    #CPU 사용률 계산
    CPU_USAGE=`ssh ${id[$i]}@${ip[$i]} "vmstat | awk '{sum += $15} END { print 100-(sum/(NR-2)) }'"`
    expect {
        "yes/no"{
            send "yes\n"
            exp_continue
        }
        "password:"{
            send "${pw[$i]}\n"
        }   
    }

    VNFD_STATUS=''
    GPS_STATUS=''

    #VNFD 상태 확인
    if [ ${server_category[$i]} = "vDU" ]; then
        spawn env LANG=C ssh ${id[$i]}@${ip[$i]}
        expect {
            "yes/no"{
                send "yes\n"
                exp_continue
            }
            "password:"{
                send "${pw[$i]}\n"
            }   
        }

        expect {
            "controller"{
                send "cp /etc/kubernetes/admin.conf ~/.kube/config"
            }
        }

        cp /etc/kubernetes/admin.conf ~/.kube/config
        vnfd=(`ssh ${id[$i]}@${ip[$i]} "kubectl get pods | awk '$3 != "Running" { print "Fail" }'"`)
        if [ -n "${vnfd}" ]; then
            VNFD_STATUS='GOOD'
        else
            VNFD_STATUS='Fail'
    fi

    #GPS 상태 확인
    if [ ${server_category[$i]} = "vDU" ]; then
        spawn env LANG=C ssh ${id[$i]}@${ip[$i]}
        expect {
            "yes/no"{
                send "yes\n"
                exp_continue
            }
            "password:"{
                send "${pw[$i]}\n"
            }   
        }

        expect {
            "controller"{
                send "cp /etc/kubernetes/admin.conf ~/.kube/config\r"
            }
        }
        
        expect {
            "controller"{
                send "source /etc/platform/openrc\r"
            }
        }
        
        if [ -n "${vnfd}" ]; then
            VNFD_STATUS='GOOD'
        else
            VNFD_STATUS='Fail'
    fi

done
