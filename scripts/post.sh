#!/bin/bash
echo "Removing FaceDetector from react-native-camera"
if [ -e node_modules/react-native-camera/ios/FaceDetector ] ; then
  rm -rf node_modules/react-native-camera/ios/FaceDetector
fi
cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RNCamera.xcodeproj/project.pbxproj