#/bin/bash
export ipfs_data=/tmp/ipfs-docker-data
export ipfs_staging=/tmp/ipfs-docker-staging
ipfs_container=`docker ps | grep ipfs_host | awk ' {print $1} '`
echo ipfs_container = $ipfs_container
if [[ !  -z  $ipfs_container  ]]
then
    echo "stoppping ipfs_host container"
    docker stop $ipfs_container 
    echo "removing ipfs_host container"
    docker rm $ipfs_container 
fi

echo "starting IPSF docker"
docker run  -d --name ipfs_host  -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/go-ipfs:latest
sleep 5

echo "this is IPFS test" > $ipfs_staging/test_file
echo "adding file to IPFS"
sleep 5
file_hash=`docker exec ipfs_host ipfs add -r /export/test_file | awk ' {print $2} '`
echo file added, file_hash = $file_hash

sleep 3
echo file content using "ipfs cat"
docker exec ipfs_host ipfs cat /ipfs/$file_hash

sleep 3
echo file content using "curl"
curl http://localhost:8080/ipfs/$file_hash

ipfs_container=`docker ps | grep ipfs_host | awk ' {print $1} '`
echo "stoppping ipfs_host container"
docker stop $ipfs_container 
echo "removing ipfs_host container"
docker rm $ipfs_container 

exit 1


