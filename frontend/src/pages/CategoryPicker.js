import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function SpinningCube({ onSelect }){
  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.8));
  return (
    <mesh ref={ref} onClick={() => onSelect(Math.floor(Math.random()*3)+1)} scale={[1.4,1.4,1.4]}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={'#7c3aed'} />
    </mesh>
  );
}

export default function CategoryPicker(){
  const [picked, setPicked] = useState(null);
  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <div className="card p-4">
        <h3 className="text-2xl font-bold mb-3">Category Picker (3D)</h3>
        <div style={{height:300}}>
          <Canvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2,2,5]} />
            <Suspense fallback={null}>
              <SpinningCube onSelect={(c)=>setPicked(c)} />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </div>
        <div className="mt-4">
          <div className="text-gray-300">Picked Category: <strong>{picked || 'Click cube to pick'}</strong></div>
        </div>
      </div>
    </div>
  );
}
