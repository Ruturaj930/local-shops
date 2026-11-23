import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function BeautyCore() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (!group.current) return

    group.current.rotation.y = t * 0.55
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(t * 0.8) * 0.55, 0.04)
    group.current.position.y = Math.sin(t * 1.25) * 0.2
  })

  return (
    <group ref={group}>
      <Float speed={2.2} rotationIntensity={1.3} floatIntensity={0.9}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshPhysicalMaterial
            color="#f7e5d7"
            roughness={0.22}
            metalness={0.08}
            transmission={0.22}
            thickness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.25}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.75, 0.08, 18, 120]} />
          <meshStandardMaterial color="#d9e692" emissive="#d9e692" emissiveIntensity={0.25} />
        </mesh>

        <mesh rotation={[0.9, 0.5, 0.8]} position={[0.2, -0.4, 0.3]}>
          <torusGeometry args={[1.1, 0.05, 12, 96]} />
          <meshStandardMaterial color="#d76e69" emissive="#d76e69" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      <mesh position={[1.05, -0.7, -0.9]} rotation={[0.35, 1.1, 0.6]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#f7d5b8" emissive="#f7d5b8" emissiveIntensity={0.15} />
      </mesh>

      <mesh position={[-1.1, 0.9, -0.7]} rotation={[0.8, 0.7, 0.3]}>
        <dodecahedronGeometry args={[0.27, 0]} />
        <meshStandardMaterial color="#fff3de" emissive="#fff3de" emissiveIntensity={0.12} />
      </mesh>

      <mesh position={[0.7, 1.2, -0.3]} rotation={[0.2, 0.4, 0.9]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#d9e692" emissive="#d9e692" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="hero3d-wrap">
      <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }} dpr={[1, 2]}>
        <color attach="background" args={['#d78e7d']} />
        <fog attach="fog" args={['#d78e7d', 5, 9]} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[2.5, 2, 2]} intensity={2.3} color="#fff5ea" />
        <pointLight position={[-2.5, 1.2, 1.2]} intensity={1.7} color="#fbe7d2" />
        <spotLight position={[0, 4, 3]} angle={0.6} intensity={0.9} penumbra={1} color="#fffaf0" />
        <BeautyCore />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  )
}
