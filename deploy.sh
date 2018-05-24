#!/bin/sh
handle=$1;
env=$2;

# 远程部署机 webhook
# 用远程机器部署 
# preHandle(){
#     git pull orgin master
#     npm config set registry http://registry.npm.taobao.org/
#     npm install
#     npm run build-prod
# }
# 清空mos目录
emptyRemoteMos(){
    if [ $env == "prod" ]
    then
        echo "[exec]remove remote:60.205.94.254 /data/app/mos"
        ssh  root@101.201.42.115 "rm -rf /data/app/mos"
    else 
    	# dev
    	echo "[exec]remove remote:60.205.94.254 /data/app/mos"
        ssh  root@60.205.94.254 "rm -rf /data/app/mos"
        
    fi
}
# 传送文件到254
transferFileToDevSever(){
	echo "[exec] transfer file to devServer 60.205.94.254 "
	scp -r ./mos root@60.205.94.254:/data/app/
}
if [ $handle == 'build' ]
then 		
	if [ $env == 'prod' ]

	then 
		env='prod'
		echo '\033[31m [exec] build prod  root@101.201.42.115 环境部署   \033[0m' 
		npm run build 
		emptyRemoteMos
		transferFileToProdSever
	else 
		env='dev'
		echo '\033[31m  [exec] build devdevelopment 60.205.94.254 环境部署   \033[0m'
		npm run build 
		emptyRemoteMos
		transferFileToDevSever

	fi

fi














