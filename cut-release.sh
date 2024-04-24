#!/bin/bash

# Bump the patch version in package.json and commit the change
# Replace 'patch' with 'minor' or 'major' as needed
new_version=$(npm version minor)

# Extract only the version number without the leading 'v'
new_version_number=${new_version:1}

# Create a Git tag for the new version
git tag -a $new_version -m "test release $new_version_number"

# Push the new tag to the remote repository
git push origin $new_version

echo "Version bumped to $new_version_number, and tag pushed to GitHub."
