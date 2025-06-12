// import React, { useRef, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { GLView } from 'expo-gl';
// import { Renderer } from 'expo-three';
// import { AR } from 'expo-three-ar';
// import * as THREE from 'three';

// export default function GardenAr() {
//   const glViewRef = useRef();
//   const planeMeshesRef = useRef({}); // Track anchors and meshes by ID

//   const onContextCreate = async (gl) => {
//     AR.startAsync(gl);

//     const scene = new THREE.Scene();
//     const camera = AR.createCamera(gl);
//     scene.add(camera);

//     const renderer = new Renderer({ gl });
//     renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(0, 10, 10);
//     scene.add(light);

//     // Render loop
//     const render = async () => {
//       requestAnimationFrame(render);

//       // Get AR anchors (including planes)
//       const anchors = await AR.getAnchorsAsync();

//       anchors.forEach((anchor) => {
//         if (anchor.type === 'ARPlaneAnchor') {
//           const { identifier, transform, extent } = anchor;
//           const matrix = new THREE.Matrix4().fromArray(transform);

//           // Decompose matrix to position & rotation
//           const pos = new THREE.Vector3();
//           const rot = new THREE.Quaternion();
//           const scale = new THREE.Vector3();
//           matrix.decompose(pos, rot, scale);

//           let mesh = planeMeshesRef.current[identifier];

//           if (!mesh) {
//             // Create new mesh
//             mesh = new THREE.Mesh(
//               new THREE.PlaneGeometry(extent.x, extent.z),
//               new THREE.MeshBasicMaterial({
//                 color: 0x00ff00,
//                 transparent: true,
//                 opacity: 0.3,
//                 side: THREE.DoubleSide,
//               })
//             );
//             mesh.rotation.x = -Math.PI / 2; // Align plane horizontally
//             scene.add(mesh);
//             planeMeshesRef.current[identifier] = mesh;
//           }

//           // Update mesh position, rotation, and size
//           mesh.position.copy(pos);
//           mesh.quaternion.copy(rot);
//           mesh.scale.set(1, 1, 1); // Reset scale
//           mesh.geometry.dispose();
//           mesh.geometry = new THREE.PlaneGeometry(extent.x, extent.z);
//         }
//       });

//       renderer.render(scene, camera);
//       gl.endFrameEXP();
//     };

//     render();
//   };

//   return (
//     <View style={styles.container}>
//       <GLView
//         ref={glViewRef}
//         style={styles.glView}
//         onContextCreate={onContextCreate}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   glView: {
//     flex: 1,
//   },
// });
