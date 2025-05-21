#!/bin/sh
branch_name=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch_name" = "dev" ]; then
  echo "Running build command before pushing to dev branch..."
  npm run build
  
  if [ $? -ne 0 ]; then
    echo "Build failed. Aborting push."
    exit 1
  fi
fi

if [ "$branch_name" = "staging" ]; then
  echo "Running build command before pushing to staging branch..."
  npm run build

  if [ $? -ne 0 ]; then
    echo "Build failed. Aborting push."
    exit 1
  fi
fi

if [ "$branch_name" = "prod" ]; then
  echo "Running build command before pushing to dev branch..."
  npm run build
  
  if [ $? -ne 0 ]; then
    echo "Build failed. Aborting push."
    exit 1
  fi
fi