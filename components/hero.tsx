"use client";

import { useRef, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Enhanced Stars background with pulsing effect
function Stars() {
  const starsRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const [sizes, setSizes] = useState<
    { size: number; pulseFactor: number; pulseSpeed: number }[]
  >([]);

  const starCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const newSizes = new Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Random initial size
      newSizes[i] = {
        size: Math.random() * 0.05 + 0.02,
        pulseFactor: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.5 + 0.5,
      };
    }

    setSizes(newSizes);
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      starsRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.005) * 0.1;

      // Update sizes for pulsing effect
      const material = starsRef.current.material;
      const time = clock.getElapsedTime();

      if (material && sizes.length) {
        const sizeAttribute = starsRef.current.geometry.attributes.size;

        for (let i = 0; i < starCount; i++) {
          const pulse =
            Math.sin(time * sizes[i].pulseSpeed) * 0.2 * sizes[i].pulseFactor +
            1;
          sizeAttribute.array[i] = sizes[i].size * pulse;
        }

        sizeAttribute.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starCount}
          array={new Float32Array(starCount).fill(0.05)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="white"
        sizeAttenuation
        transparent
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Flying Stars animation
function FlyingStars() {
  const flyingStarsRef = useRef();

  const starCount = 100;
  const starData = useMemo(() => {
    return Array.from({ length: starCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      size: Math.random() * 0.1 + 0.05,
      color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.9, 0.7),
    }));
  }, []);

  const positions = useMemo(() => {
    const posArray = new Float32Array(starCount * 3);
    starData.forEach((star, i) => {
      posArray[i * 3] = star.position.x;
      posArray[i * 3 + 1] = star.position.y;
      posArray[i * 3 + 2] = star.position.z;
    });
    return posArray;
  }, [starData]);

  const colors = useMemo(() => {
    const colArray = new Float32Array(starCount * 3);
    starData.forEach((star, i) => {
      colArray[i * 3] = star.color.r;
      colArray[i * 3 + 1] = star.color.g;
      colArray[i * 3 + 2] = star.color.b;
    });
    return colArray;
  }, [starData]);

  useFrame(() => {
    if (flyingStarsRef.current) {
      const positions =
        flyingStarsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < starCount; i++) {
        // Update position based on velocity
        starData[i].position.add(starData[i].velocity);

        // Reset if star goes too far
        const pos = starData[i].position;
        const maxRange = 20;
        if (
          Math.abs(pos.x) > maxRange ||
          Math.abs(pos.y) > maxRange ||
          Math.abs(pos.z) > maxRange
        ) {
          // Reset to opposite side to create continuous flow
          pos.x = Math.sign(pos.x) * -maxRange * 0.8;
          pos.y = Math.sign(pos.y) * -maxRange * 0.8;
          pos.z = Math.sign(pos.z) * -maxRange * 0.8;
        }

        // Update buffer
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }

      flyingStarsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={flyingStarsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Enhanced NetworkGlobe with more realistic and smooth animations
function NetworkGlobe() {
  const globeRef = useRef();
  const nodesRef = useRef([]);
  const dataPacketsRef = useRef([]);
  const orbitsRef = useRef([]);

  // Create a texture for the globe
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#1a3a8c");
    gradient.addColorStop(1, "#0c1445");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add some random dots for continents
    ctx.fillStyle = "#3584e4";
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const size = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add some grid lines
    ctx.strokeStyle = "#4c8dff33";
    ctx.lineWidth = 0.5;

    // Latitude lines
    for (let i = 0; i < 10; i++) {
      const y = (i * 256) / 10;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Longitude lines
    for (let i = 0; i < 20; i++) {
      const x = (i * 512) / 20;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const { orbits, nodes, dataPackets } = useMemo(() => {
    const globeRadius = 1.2;
    const numOrbits = 5;
    const orbits = [];
    const nodes = [];
    const dataPackets = [];

    for (let i = 0; i < numOrbits; i++) {
      const orbitRadius = globeRadius + 0.3 + i * 0.3;
      const nodesPerOrbit = 6 + i * 3;
      const orbitTilt = Math.random() * Math.PI * 0.5;
      const orbitRotationSpeed =
        (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1);

      orbits.push({
        radius: orbitRadius,
        tilt: orbitTilt,
        rotationAxis: new THREE.Vector3(
          Math.sin(orbitTilt),
          Math.cos(orbitTilt),
          Math.random() * 0.2
        ).normalize(),
        rotationSpeed: orbitRotationSpeed,
      });

      for (let j = 0; j < nodesPerOrbit; j++) {
        const angle = (j / nodesPerOrbit) * Math.PI * 2;
        const position = new THREE.Vector3(
          Math.cos(angle) * orbitRadius,
          0,
          Math.sin(angle) * orbitRadius
        );
        position.applyAxisAngle(new THREE.Vector3(1, 0, 0), orbitTilt);

        nodes.push({
          position: position.clone(),
          orbitIndex: i,
          angleOffset: angle,
          size: 0.04 + Math.random() * 0.03,
          pulseSpeed: 0.5 + Math.random() * 1.5,
          color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6),
        });
      }

      const packetsPerOrbit = 6 + i * 2;
      for (let j = 0; j < packetsPerOrbit; j++) {
        const startNodeIndex = Math.floor(Math.random() * nodesPerOrbit);
        let endNodeIndex = Math.floor(Math.random() * nodesPerOrbit);
        while (endNodeIndex === startNodeIndex) {
          endNodeIndex = Math.floor(Math.random() * nodesPerOrbit);
        }
        const baseIndex = nodes.length - nodesPerOrbit;
        dataPackets.push({
          orbitIndex: i,
          startNodeIndex: baseIndex + startNodeIndex,
          endNodeIndex: baseIndex + endNodeIndex,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.02,
          active: Math.random() > 0.3,
          size: 0.03 + Math.random() * 0.02,
          color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.9, 0.7),
        });
      }
    }

    return { orbits, nodes, dataPackets };
  }, []);

  const packetPaths = useMemo(() => {
    return dataPackets.map((packet) => {
      if (!nodes[packet.startNodeIndex] || !nodes[packet.endNodeIndex]) {
        return { curve: null, points: [] };
      }

      const start = nodes[packet.startNodeIndex].position.clone();
      const end = nodes[packet.endNodeIndex].position.clone();
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(end, start);
      const arc = new THREE.Vector3()
        .crossVectors(dir, new THREE.Vector3(0, 1, 0))
        .normalize()
        .multiplyScalar(0.3);
      mid.add(arc);

      // Create a curve with points for smoother animation
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50); // Get 50 points along the curve

      return { curve, points };
    });
  }, [nodes, dataPackets]);

  useFrame(({ clock, delta }) => {
    const time = clock.getElapsedTime();

    // Realistic globe rotation with smooth easing
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.05;
      globeRef.current.rotation.x = Math.sin(time * 0.1) * 0.03;
      globeRef.current.rotation.z = Math.cos(time * 0.08) * 0.02;
    }

    // Smooth orbit rotation
    if (orbitsRef.current) {
      orbitsRef.current.forEach((orbitMesh, i) => {
        if (orbitMesh && orbits[i]) {
          orbitMesh.rotation.x = orbits[i].tilt;
          orbitMesh.rotation.y = time * orbits[i].rotationSpeed * 0.2;
        }
      });
    }

    // Smooth node movement with easing
    if (nodesRef.current) {
      nodesRef.current.forEach((nodeMesh, i) => {
        if (nodeMesh && nodes[i]) {
          const node = nodes[i];
          const orbit = orbits[node.orbitIndex];
          const angle = node.angleOffset + time * orbit.rotationSpeed * 0.5;

          // Calculate target position with smooth rotation
          const targetPos = new THREE.Vector3(
            Math.cos(angle) * orbit.radius,
            Math.sin(angle * 0.5) * 0.1, // Add slight vertical movement
            Math.sin(angle) * orbit.radius
          ).applyAxisAngle(orbit.rotationAxis, orbit.tilt);

          // Apply smooth easing to position
          nodeMesh.position.lerp(targetPos, delta * 2);

          // Smooth pulsing effect
          const pulse = Math.sin(time * node.pulseSpeed) * 0.15 + 1;
          nodeMesh.scale.set(pulse, pulse, pulse);
        }
      });
    }

    // Enhanced data packet movement
    if (dataPacketsRef.current) {
      dataPacketsRef.current.forEach((packetMesh, i) => {
        if (!packetMesh || !dataPackets[i] || !packetPaths[i]) return;

        const packet = dataPackets[i];
        const path = packetPaths[i];

        // Randomly activate/deactivate packets
        if (Math.random() < 0.001) packet.active = !packet.active;

        if (packet.active && path.points && path.points.length > 0) {
          // Smooth progress increment
          packet.progress += packet.speed * delta * 1.5;

          if (packet.progress > 1) {
            packet.progress = 0;
          }

          // Get position from pre-calculated points for smoother movement
          const pointIndex = Math.floor(packet.progress * path.points.length);
          if (pointIndex < path.points.length) {
            const pos = path.points[pointIndex];

            // Apply smooth easing to position
            packetMesh.position.lerp(pos, delta * 10);
            packetMesh.visible = true;

            // Pulse effect
            const pulse = Math.sin(time * 6 + i) * 0.2 + 1;
            packetMesh.scale.set(pulse, pulse, pulse);
          }
        } else {
          packetMesh.visible = false;
        }
      });
    }
  });

  return (
    <group>
      {/* Globe with texture */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.2}
          roughness={0.8}
          emissive="#3584e4"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#3584e4"
          emissive="#3584e4"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Orbit paths (subtle rings) */}
      {orbits.map((orbit, i) => (
        <group
          key={`orbit-${i}`}
          ref={(el) => {
            if (orbitsRef.current) orbitsRef.current[i] = el;
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[orbit.radius - 0.01, orbit.radius + 0.01, 128]}
            />
            <meshBasicMaterial
              color="#99c1f1"
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Nodes with glow */}
      {nodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          position={[node.position.x, node.position.y, node.position.z]}
          ref={(el) => {
            if (nodesRef.current) nodesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Data packets with glow */}
      {dataPackets.map((packet, i) => (
        <mesh
          key={`packet-${i}`}
          visible={packet.active}
          ref={(el) => {
            if (dataPacketsRef.current) dataPacketsRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[packet.size, 16, 16]} />
          <meshStandardMaterial
            color={packet.color}
            emissive={packet.color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Space background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#3584e4"
          />
          <pointLight position={[0, 0, 0]} intensity={1} color="#3584e4" />
          <Stars />
          <FlyingStars />
          <NetworkGlobe />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.1}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 z-10 text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="animated-gradient-text block">
              Welcome to My Website
            </span>
          </h1>
          <p className="text-base md:text-xl font-medium text-gray-400 italic">
            "Semakin cepat dieksekusi, semakin cepat bisa dievaluasi."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          
        </motion.div>
      </div>
    </section>
  );
}
