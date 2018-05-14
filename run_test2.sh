#/bin/bash

export ipfs_data=/tmp/ipfs-docker-data
export ipfs_staging=/tmp/ipfs-docker-staging

echo "starting IPSF docker"
docker-compose up -d
sleep 5

content="this is IPFS test"
echo $content > $ipfs_staging/test_file
echo "adding file to IPFS"
sleep 5
file_hash=`docker-compose exec ipfs1 ipfs add -r /export/test_file | awk ' {print $9} ' | sed 's/ //g'`
echo file added, file_hash = $file_hash

sleep 3
echo file content using "ipfs cat"
content1=`docker-compose exec ipfs1 ipfs cat /ipfs/$file_hash`
echo content1=$content1
if [ "$content1" != "$content" ]; then
  docker-compose down
  exit 1
fi

sleep 3
echo file content using "curl"
content2=`curl http://localhost:8080/ipfs/$file_hash`
echo content2=$content2
if [ "$content2" != "$content" ]; then
  docker-compose down
  exit 1
fi

docker-compose down

exit 0


