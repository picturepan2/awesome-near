#!/bin/bash
set -ex

EXAMPLES=('https://github.com/near-examples/token-contract-as'
          'https://github.com/near-examples/counter'
          'https://github.com/near-examples/wallet-example'
          'https://github.com/near-examples/guest-book'
          )

# TODO=('https://github.com/nearprotocol/corgis'
#       )

cd examples || mkdir examples && cd examples;

for i in "${EXAMPLES[@]}"
do
  echo "testing $i"
  name=$(basename "$i");
  if test -d "./$name"; then
    (cd "$name"; git pull);
  else
    git clone "$i";
  fi
  (cd "$name" || exit 1; yarn install && yarn build && yarn test);
done
