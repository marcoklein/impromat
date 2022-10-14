#!/bin/usr/env bash

totalRounds=20
requestsPerRound=100
echo "Performing load test with $totalRounds rounds and $requestsPerRound requests per round."

for i in $(seq $totalRounds); 
do
  echo "Batch $i"
  for n in $(seq $requestsPerRound); 
  do
    # echo "Request $n"
    curl 'https://api.impromat.marcoklein.dev/graphql' \
      -X POST \
      -H 'content-type: application/json' \
      --data '{
        "query": "{ version }"
      }' > /dev/null 2>&1 &
  done
  wait
done
