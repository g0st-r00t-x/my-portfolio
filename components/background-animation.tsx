"use client"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useInView } from "react-intersection-observer"
import { Text } from "@react-three/drei"

// Component untuk menciptakan koin cryptocurrency
function CryptoCoins({ count = 100, colors = ["#f7931a", "#627eea", "#3c3c3d"], size = 0.15 }) {
  const mesh = useRef<THREE.Group>(null)
  const coins = useRef<THREE.Mesh[]>([])
  const coinTypes = useMemo(() => {
    return Array.from({ length: count }).map(() => Math.floor(Math.random() * 3))
  }, [count])
  
  // Symbol cryptocurrency
  const symbols = useMemo(() => ["₿", "Ξ", "ADA"], [])
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03
      coins.current.forEach((coin, i) => {
        const time = clock.getElapsedTime()
        const offset = i * 0.1
        const speed = 0.003 + (i % 5) * 0.0005
        coin.position.y += Math.sin(time + offset) * speed
        coin.rotation.x = time * 0.15
        coin.rotation.z = time * 0.08
      })
    }
  })
  
  return (
    <group ref={mesh}>
      {Array.from({ length: count }).map((_, i) => {
        // Distribusi yang lebih terstruktur namun tetap acak
        const radius = 5 + Math.random() * 5
        const theta = Math.random() * Math.PI * 2
        const y = (Math.random() - 0.5) * 8
        const position = [
          radius * Math.cos(theta),
          y,
          radius * Math.sin(theta)
        ]
        
        const typeIndex = coinTypes[i]
        const coinColor = colors[typeIndex]
        
        return (
          <mesh
            key={i}
            position={position as [number, number, number]}
            ref={(el) => {
              if (el) coins.current[i] = el
            }}
          >
            <circleGeometry args={[size, 32]} />
            <meshStandardMaterial 
              color={coinColor} 
              metalness={0.8}
              roughness={0.2}
              transparent 
              opacity={0.8} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Component untuk efek AI visualization (node connections)
function AINetworkNodes({ count = 60, color = "#61dafb" }) {
  const mesh = useRef<THREE.Group>(null)
  const nodes = useRef<THREE.Mesh[]>([])
  const lines = useRef<THREE.Line[]>([])
  const nodePositions = useRef<[number, number, number][]>([])
  
  // Membuat posisi node
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      nodePositions.current.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ])
    }
  }, [count])
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime()
      
      // Animate nodes
      nodes.current.forEach((node, i) => {
        const t = time * 0.2 + i * 0.05
        node.position.x += Math.sin(t) * 0.01
        node.position.y += Math.cos(t) * 0.01
        node.position.z += Math.sin(t + 0.5) * 0.01
        node.scale.setScalar(1 + Math.sin(t) * 0.2)
      })
      
      // Update lines
      lines.current.forEach((line, i) => {
        if (i < count - 1) {
          const startPos = nodes.current[i].position
          const endPos = nodes.current[(i + 1) % count].position
          const dist = startPos.distanceTo(endPos)
          
          // Only draw lines if nodes are close enough
          if (dist < 4) {
            const opacity = 1 - (dist / 4)
            if (line.material instanceof THREE.LineBasicMaterial) {
              line.material.opacity = opacity * 0.5
              line.material.visible = true
              
              // Update line vertices
              const positions = line.geometry.attributes.position.array as Float32Array
              positions[0] = startPos.x
              positions[1] = startPos.y
              positions[2] = startPos.z
              positions[3] = endPos.x
              positions[4] = endPos.y
              positions[5] = endPos.z
              line.geometry.attributes.position.needsUpdate = true
            }
          } else {
            if (line.material instanceof THREE.LineBasicMaterial) {
              line.material.visible = false
            }
          }
        }
      })
    }
  })
  
  return (
    <group ref={mesh}>
      {/* Nodes */}
      {nodePositions.current.map((position, i) => (
        <mesh
          key={`node-${i}`}
          position={position}
          ref={(el) => {
            if (el) nodes.current[i] = el
          }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.5} 
          />
        </mesh>
      ))}
      
      {/* Connections */}
      {Array.from({ length: count }).map((_, i) => {
        const startPos = nodePositions.current[i]
        const endPos = nodePositions.current[(i + 1) % count]
        
        // Create a line geometry
        const lineGeometry = new THREE.BufferGeometry()
        const positions = new Float32Array([
          startPos[0], startPos[1], startPos[2],
          endPos[0], endPos[1], endPos[2]
        ])
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        
        return (
          <line
            key={`line-${i}`}
            geometry={lineGeometry}
            ref={(el) => {
              if (el) lines.current[i] = el
            }}
          >
            <lineBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2} 
              linewidth={1} 
            />
          </line>
        )
      })}
    </group>
  )
}

// Binary code particles floating around
function BinaryParticles({ count = 40 }) {
  const group = useRef<THREE.Group>(null)
  const particles = useRef<THREE.Mesh[]>([])
  
  useFrame(({ clock }) => {
    if (group.current) {
      const time = clock.getElapsedTime()
      
      particles.current.forEach((particle, i) => {
        const t = time * 0.1 + i * 0.05
        particle.position.y += Math.sin(t) * 0.01
        particle.rotation.z = time * 0.1
      })
    }
  })
  
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const position = [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16
        ]
        const binaryChar = Math.random() > 0.5 ? "0" : "1"
        const scale = 0.2 + Math.random() * 0.3
        
        return (
          <Text
            key={i}
            position={position as [number, number, number]}
            ref={(el) => {
              if (el) particles.current[i] = el
            }}
            fontSize={scale}
            color="#00ff88"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.6}
          >
            {binaryChar}
          </Text>
        )
      })}
    </group>
  )
}

export default function BackgroundAnimation() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  return (
    <div ref={ref} className="absolute inset-0 z-0 opacity-75">
      {inView && (
        <div className="h-full w-full">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <fog attach="fog" args={["#000", 10, 30]} />
            
            {/* Bitcoin (gold), Ethereum (blue), Cardano (blue-gray) */}
            <CryptoCoins count={80} colors={["#f7931a", "#627eea", "#3c3c3d"]} size={0.15} />
            
            {/* AI Network Visualization */}
            <AINetworkNodes count={60} color="#61dafb" />
            
            {/* Binary code particles */}
            <BinaryParticles count={40} />
          </Canvas>
        </div>
      )}
    </div>
  )
}

