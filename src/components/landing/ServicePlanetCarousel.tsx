import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type ServiceItem = {
  title: string;
  description: string;
  examples: string[];
};

type ServicePlanet = {
  service: ServiceItem;
  modelSrc: string;
  accent: "cyan" | "violet" | "amber";
  kicker: string;
};

type Traversable = {
  traverse: (callback: (object: unknown) => void) => void;
};

type DisposableGeometry = {
  dispose?: () => void;
};

type DisposableMaterial = Record<string, unknown> & {
  dispose: () => void;
};

type DisposableTexture = {
  anisotropy: number;
  dispose: () => void;
  needsUpdate: boolean;
};

type DisposableMesh = {
  geometry?: DisposableGeometry;
  material?: unknown;
  frustumCulled?: boolean;
};

type TransformVector = {
  sub: (vector: unknown) => void;
};

type TransformScale = {
  setScalar: (value: number) => void;
};

type TransformRotation = {
  y: number;
  set: (x: number, y: number, z: number) => void;
};

type ModelRoot = Traversable & {
  position: TransformVector;
  scale: TransformScale;
  rotation: TransformRotation;
};

type LoadedGLTF = {
  scene: ModelRoot;
};

const PLANET_MODELS = [
  {
    modelSrc: "/models/services/mercury_enhanced_color.glb",
    accent: "cyan",
    kicker: "Digital Presence",
  },
  {
    modelSrc: "/models/services/jupiter.glb",
    accent: "violet",
    kicker: "Intelligent Automation",
  },
  {
    modelSrc: "/models/services/moon.glb",
    accent: "amber",
    kicker: "Business Systems",
  },
] as const;

function isMesh(object: unknown): object is DisposableMesh {
  return object instanceof THREE.Mesh;
}

function isDisposableMaterial(value: unknown): value is DisposableMaterial {
  return typeof value === "object" && value !== null && "dispose" in value;
}

function isTexture(value: unknown): value is DisposableTexture {
  return value instanceof THREE.Texture;
}

function disposeScene(scene: Traversable) {
  scene.traverse((object: unknown) => {
    if (!isMesh(object)) return;

    object.geometry?.dispose?.();

    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if (!isDisposableMaterial(material)) return;

      Object.values(material).forEach((value) => {
        if (isTexture(value)) {
          value.dispose();
        }
      });
      material.dispose();
    });
  });
}

function getRelativeIndex(index: number, activeIndex: number, total: number) {
  let relative = index - activeIndex;

  if (relative > total / 2) relative -= total;
  if (relative < -total / 2) relative += total;

  return relative;
}

function PlanetModel({ src, active }: { src: string; active: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<ModelRoot | null>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frameId = 0;
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(2.6, 1.6, 4.8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x67e8f9, 1.65);
    rimLight.position.set(-3, 0.8, -2.8);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0xe0f2fe, 0x111827, 1.65);
    scene.add(fillLight);

    const warmLight = new THREE.DirectionalLight(0xffedd5, 0.85);
    warmLight.position.set(-1.8, -1.2, 3.2);
    scene.add(warmLight);

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf: LoadedGLTF) => {
        if (disposed) return;

        const root = gltf.scene;
        root.traverse((object: unknown) => {
          if (isMesh(object)) {
            object.frustumCulled = false;
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => {
              if (!isDisposableMaterial(material)) return;
              Object.values(material).forEach((value) => {
                if (!isTexture(value)) return;
                value.anisotropy = renderer.capabilities.getMaxAnisotropy();
                value.needsUpdate = true;
              });
            });
          }
        });

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;

        const pivot = new THREE.Group();
        root.position.sub(center);
        pivot.add(root);
        pivot.scale.setScalar(2.22 / maxAxis);
        pivot.rotation.set(0.08, -0.5, 0);

        scene.add(pivot);
        modelRef.current = pivot;
      },
      undefined,
      () => {
        modelRef.current = null;
      },
    );

    const resize = () => {
      const width = mount.clientWidth || 320;
      const height = mount.clientHeight || 320;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const model = modelRef.current;

      if (model && !reduceMotion) {
        model.rotation.y += delta * (activeRef.current ? 0.48 : 0.24);
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return <div ref={mountRef} className="service-planet-model" aria-hidden="true" />;
}

export function ServicePlanetCarousel({ items }: { items: ServiceItem[] }) {
  const planets: ServicePlanet[] = items.slice(0, 3).map((service, index) => ({
    service,
    ...PLANET_MODELS[index],
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stageWidth, setStageWidth] = useState(1100);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateWidth = () => setStageWidth(stage.clientWidth || 1100);
    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);
    updateWidth();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || isDragging || planets.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % planets.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [isDragging, planets.length]);

  const movePrevious = () => {
    setActiveIndex((current) => (current - 1 + planets.length) % planets.length);
  };

  const moveNext = () => {
    setActiveIndex((current) => (current + 1) % planets.length);
  };

  const finishDrag = () => {
    const currentOffset = dragOffsetRef.current;
    const threshold = Math.max(stageWidth * 0.075, 42);
    const velocity = dragVelocityRef.current;

    if (currentOffset > threshold || velocity > 0.48) {
      movePrevious();
    } else if (currentOffset < -threshold || velocity < -0.48) {
      moveNext();
    }

    dragOffsetRef.current = 0;
    dragVelocityRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = event.timeStamp;
    dragVelocityRef.current = 0;
    hasDraggedRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rawOffset = event.clientX - dragStartXRef.current;
    const limit = stageWidth * 0.48;
    const nextOffset = Math.max(-limit, Math.min(limit, rawOffset));
    const elapsed = Math.max(event.timeStamp - lastPointerTimeRef.current, 1);
    const instantVelocity = (event.clientX - lastPointerXRef.current) / elapsed;
    dragVelocityRef.current = dragVelocityRef.current * 0.55 + instantVelocity * 0.45;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = event.timeStamp;

    if (Math.abs(nextOffset) > 6) {
      hasDraggedRef.current = true;
    }

    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishDrag();
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragOffset(0);
    dragOffsetRef.current = 0;
    dragVelocityRef.current = 0;
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      movePrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveNext();
    }
  };

  if (!planets.length) return null;

  return (
    <div className="services-planet-showcase mt-12">
      <div
        ref={stageRef}
        className="services-planet-stage"
        data-dragging={isDragging}
        role="region"
        tabIndex={0}
        aria-label="Services planet carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
      >
        {planets.map((planet, index) => {
          const relativeIndex = getRelativeIndex(index, activeIndex, planets.length);
          const isActive = relativeIndex === 0;
          const slotDistance =
            stageWidth * (stageWidth < 640 ? 0.78 : stageWidth < 1024 ? 0.42 : 0.34);
          const horizontalOffset = relativeIndex * slotDistance + dragOffset;
          const verticalOffset = isActive ? 0 : 24;
          const scale = isActive ? 1 : 0.78;

          return (
            <article
              key={planet.service.title}
              className="service-planet-card"
              data-accent={planet.accent}
              data-active={isActive}
              onClick={() => {
                if (!hasDraggedRef.current && !isActive) {
                  setActiveIndex(index);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + ${horizontalOffset}px), ${verticalOffset}px, 0) scale(${scale})`,
              }}
            >
              <PlanetModel src={planet.modelSrc} active={isActive} />
              <div className="service-planet-copy">
                <span className="service-planet-kicker">{planet.kicker}</span>
                <h3 className="service-planet-title">{planet.service.title}</h3>
                <p className="service-planet-description">{planet.service.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
