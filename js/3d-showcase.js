// Modern AI-Powered 3D Showcase Component
class AIShowcase3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.images = options.images || [];
    this.currentIndex = 0;
    this.rotationSpeed = options.rotationSpeed || 0.005;
    this.autoRotate = options.autoRotate !== false;
    this.isInitialized = false;
    
    if (this.container) {
      this.init();
    } else {
      console.warn(`AI Showcase: Container with ID '${containerId}' not found`);
    }
  }

  async init() {
    try {
      // Check if Three.js is loaded
      if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, falling back to 2D visualization');
        this.initFallback();
        return;
      }

      // Create Three.js scene
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      
      // Set up renderer with proper error handling
      this.renderer.setSize(400, 400);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);
      
      // Add lights
      this.addLights();
      
      // Load images and create materials
      if (this.images.length > 0) {
        await this.loadImages();
      }
      
      this.createAIVisualization();
      this.animate();
      this.addEventListeners();
      
      this.isInitialized = true;
      console.log('AI 3D Showcase initialized successfully');
      
    } catch (error) {
      console.error('Error initializing AI 3D Showcase:', error);
      this.initFallback();
    }
  }
  
  addLights() {
    // Enhanced lighting for AI visualization
    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.4);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x0099ff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    
    // Add point light for dynamic effect
    const pointLight = new THREE.PointLight(0x00ff88, 0.5, 100);
    pointLight.position.set(0, 0, 10);
    this.scene.add(pointLight);
  }
  
  async loadImages() {
    this.textureLoader = new THREE.TextureLoader();
    this.materials = [];
    
    for (const imageUrl of this.images) {
      try {
        const texture = await new Promise((resolve, reject) => {
          this.textureLoader.load(
            imageUrl, 
            resolve,
            undefined,
            reject
          );
        });
        
        this.materials.push(new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        }));
      } catch (error) {
        console.warn(`Failed to load image: ${imageUrl}`, error);
      }
    }
  }
  
  createAIVisualization() {
    // Create AI-themed geometric visualization
    const geometry = new THREE.IcosahedronGeometry(3, 1);
    
    // AI-themed material with gradient effect
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
      shininess: 100
    });
    
    this.aiMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.aiMesh);
    
    // Add data particles around the main mesh
    this.createDataParticles();
    
    this.camera.position.z = 8;
  }
  
  createDataParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0099ff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particles);
  }
  
  addEventListeners() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Mouse interaction
    this.container.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      this.container.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.aiMesh) return;
      
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      this.aiMesh.rotation.y += deltaX * 0.01;
      this.aiMesh.rotation.x += deltaY * 0.01;
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    // Touch support for mobile
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
      }
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!isDragging || !this.aiMesh || e.touches.length !== 1) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousMousePosition.x;
      const deltaY = touch.clientY - previousMousePosition.y;
      
      this.aiMesh.rotation.y += deltaX * 0.01;
      this.aiMesh.rotation.x += deltaY * 0.01;
      
      previousMousePosition = { x: touch.clientX, y: touch.clientY };
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Window resize handling
    window.addEventListener('resize', () => this.onWindowResize());
  }
  
  onWindowResize() {
    if (!this.isInitialized || !this.camera || !this.renderer) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  animate() {
    if (!this.isInitialized) return;
    
    requestAnimationFrame(() => this.animate());
    
    if (this.autoRotate && this.aiMesh) {
      this.aiMesh.rotation.y += this.rotationSpeed;
      this.aiMesh.rotation.x += this.rotationSpeed * 0.5;
    }
    
    // Animate particles
    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;
    }
    
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      console.warn('Render error:', error);
    }
  }
  
  initFallback() {
    // 2D fallback visualization when 3D fails
    this.container.innerHTML = `
      <div style="
        width: 100%;
        height: 400px;
        background: linear-gradient(135deg, #00ff88, #0099ff);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0a0e1a;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <div style="position: relative; z-index: 2;">
          ?? AI Visualization<br>
          <span style="font-size: 1rem; opacity: 0.8;">Interactive Demo Available</span>
        </div>
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"0.5\" opacity=\"0.3\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/></svg>');
          animation: drift 20s linear infinite;
        "></div>
      </div>
      <style>
        @keyframes drift {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-10px) translateY(-10px); }
        }
      </style>
    `;
  }
  
  // Cleanup method
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      // Clean up scene objects
      while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
      }
    }
    this.isInitialized = false;
  }
}

// Safe initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AI showcase if container exists
  const showcaseContainer = document.getElementById('ai-showcase-container');
  if (showcaseContainer) {
    new AIShowcase3D('ai-showcase-container', {
      rotationSpeed: 0.003,
      autoRotate: true
    });
  }
  
  // Initialize tech showcase if container exists
  const techContainer = document.getElementById('techShowcase');
  if (techContainer) {
    new AIShowcase3D('techShowcase', {
      rotationSpeed: 0.005,
      autoRotate: true
    });
  }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIShowcase3D;
