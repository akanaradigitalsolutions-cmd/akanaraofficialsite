import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Hero object: a slowly morphing obsidian shard.
 * - follows the pointer with damped rotation
 * - scroll drives an extra rotation + distortion pass
 * Tune SPIN, TILT and DISTORT to change the feel.
 */
const SPIN = 0.12;
const TILT = 0.35;
const DISTORT = 0.42;

function Shard() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const scrollRef = useRef(0);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const m = mesh.current;
    if (!m) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollRef.current = max > 0 ? window.scrollY / max : 0;

    const targetX = -pointer.y * TILT;
    const targetY = pointer.x * TILT + scrollRef.current * Math.PI * 2;
    // frame-rate independent damping
    const k = 1 - Math.exp(-3 * dt);
    m.rotation.x += (targetX - m.rotation.x) * k;
    m.rotation.y += (targetY - m.rotation.y) * k;
    m.rotation.z += SPIN * dt;
    const s = 1 - scrollRef.current * 0.25;
    m.scale.setScalar(s);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 16]} />
      <MeshDistortMaterial
        color="#14100f"
        roughness={0.12}
        metalness={0.95}
        distort={DISTORT}
        speed={1.1}
        envMapIntensity={1.6}
      />
    </mesh>
  );
}

export default function ObsidianScene() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#f0b183" />
      <pointLight position={[-4, -2, -3]} intensity={12} color="#e07a3c" />
      <Shard />
      <Environment resolution={128}>
        <Lightformer
          intensity={3}
          color="#ffb27a"
          position={[0, 4, 2]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={1.4}
          color="#4a3b34"
          position={[-5, 0, -2]}
          rotation-y={Math.PI / 2}
          scale={[18, 4, 1]}
        />
        <Lightformer
          intensity={1}
          color="#ffffff"
          position={[5, -2, 1]}
          rotation-y={-Math.PI / 2}
          scale={[12, 3, 1]}
        />
      </Environment>
    </Canvas>
  );
}
