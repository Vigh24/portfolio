// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('active');
});

// Form submission handling
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    form.reset();
});

// Optimize scroll event handling with throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(() => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.width = `${progress}%`;
}, 50));

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// Optimize intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

// Use a single observer for all elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to save resources
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-card, section').forEach((el) => {
    observer.observe(el);
});

// Lazy load images
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Add hover animation to nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseover', (e) => {
        cursor.classList.add('active');
        link.style.transform = 'scale(1.1)';
    });
    
    link.addEventListener('mouseout', (e) => {
        cursor.classList.remove('active');
        link.style.transform = 'scale(1)';
    });
});

// Enhanced typing animation
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}

// Add particle background
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#007bff' },
        shape: {
            type: 'circle',
            stroke: { width: 0 },
            polygon: { nb_sides: 5 }
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: { enable: true, speed: 1 }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#007bff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            out_mode: 'bounce'
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            }
        }
    }
}); 

const projectDetails = {
    'iot-dashboard': {
        title: 'IoT Sensor Dashboard',
        description: 'A real-time dashboard for monitoring IoT sensor data with advanced visualization features.',
        features: [
            'Real-time data visualization',
            'Multiple sensor support',
            'Interactive charts and graphs',
            'Data export functionality',
            'Customizable dashboard layouts'
        ],
        technical: [
            'Frontend built with React and Material-UI',
            'Backend using Node.js and Express',
            'Real-time updates using WebSocket',
            'MongoDB for data storage',
            'RESTful API architecture'
        ],
        challenges: [
            'Implementing efficient real-time data handling',
            'Optimizing performance for large datasets',
            'Creating responsive and intuitive UI'
        ]
    },
    'apni-bhasha': {
        title: 'Apni Bhasha - Screen Translation App',
        description: 'An Android application that provides real-time screen translation capabilities, allowing users to translate text from any app or screen on their Android device without leaving their current context.',
        features: [
            'Real-time screen translation',
            'Support for multiple languages (English, German, Spanish, French, Italian, Japanese, Chinese)',
            'Floating translation button accessible from any screen',
            'Interactive translation overlays',
            'Clean and intuitive user interface',
            'Fast and efficient text recognition',
            'Privacy-focused (processes everything locally except translations)'
        ],
        technical: [
            'Built with Kotlin and Android SDK',
            'Android MediaProjection API for screen capture',
            'ML Kit for text recognition',
            'Google Cloud Translation API integration',
            'Android Window Manager for overlay handling',
            'Clean architecture with MVVM pattern'
        ],
        challenges: [
            'Implementing efficient screen capture and text recognition',
            'Managing overlay permissions and window management',
            'Optimizing performance for real-time translation',
            'Ensuring user privacy and data security',
            'Creating an intuitive floating UI that works across apps'
        ],
        permissions: [
            'Screen Capture permission (for reading screen content)',
            'Overlay permission (for floating button and translations)',
            'Internet access (for translation services)'
        ]
    },
    'voip-softphone': {
        title: 'VoIP Softphone Application',
        description: 'A feature-rich VoIP (Voice over IP) softphone application built with C# Windows Forms, offering comprehensive calling capabilities and communication features.',
        features: [
            'Make and receive VoIP calls with multiple line support',
            'Call transfer, hold/resume, and mute functionalities',
            'Call logging and history tracking',
            'Screen sharing capabilities',
            'Multiple audio/video codec support',
            'Camera and audio device selection',
            'Call recording and forwarding',
            'Contact management and integration'
        ],
        technical: [
            'Built with C# and Windows Forms',
            'Implemented multiple audio codecs (G.711, G.729, iLBC, GSM, AMR, G.722, Speex, Opus)',
            'Video codec support (H.264, VP8, VP9)',
            'SIP protocol integration',
            'Real-time audio/video processing',
            'Windows OS integration'
        ],
        challenges: [
            'Implementing complex VoIP protocols and codecs',
            'Optimizing real-time audio/video processing',
            'Managing multiple concurrent calls',
            'Ensuring call quality and stability',
            'Creating an intuitive user interface for complex features'
        ],
        specifications: {
            audioCodecs: [
                'G.711 (uLaw/aLaw)',
                'G.729',
                'iLBC',
                'GSM',
                'AMR',
                'G.722',
                'Speex',
                'Opus'
            ],
            videoCodecs: [
                'H.264',
                'VP8',
                'VP9'
            ],
            interface: [
                'Intuitive dialpad interface',
                'Easy-to-use call controls',
                'Line selection',
                'Status indicators',
                'Recent calls display'
            ]
        }
    },
    'moto-safety': {
        title: 'Motorcycle Safety System with Bluetooth Connectivity',
        description: 'A smart motorcycle safety system that uses Bluetooth sensors and smartphone capabilities to detect accidents and provide immediate emergency response. The application monitors vehicle orientation through Bluetooth-connected sensors and can automatically trigger emergency protocols in case of accidents.',
        features: [
            'Bluetooth sensor connectivity and management',
            'Real-time accident detection',
            'Location tracking and geocoding',
            'Emergency SOS system',
            'Medical information display',
            'Emergency contact notification',
            'Emergency flashlight activation',
            'Vibration alerts',
            'User profile management'
        ],
        technical: [
            'Built with Android Studio and Java',
            'Bluetooth Low Energy (BLE) integration',
            'GPS and location services implementation',
            'Accelerometer and gyroscope sensor data processing',
            'Background service for continuous monitoring',
            'SQLite database for user data storage'
        ],
        challenges: [
            'Implementing reliable accident detection algorithms',
            'Optimizing battery consumption with continuous Bluetooth monitoring',
            'Ensuring accurate GPS tracking in various conditions',
            'Managing background processes efficiently',
            'Creating a fail-safe emergency notification system'
        ],
        specifications: {
            requirements: [
                'Android 6.0 (API 23) minimum',
                'Bluetooth-enabled Android device',
                'Compatible Bluetooth sensors for motorcycle',
                'GPS capability',
                'Internet connectivity for emergency notifications'
            ],
            features: [
                'Real-time sensor data processing',
                'Automated emergency response system',
                'Custom alert configurations',
                'Emergency contact management',
                'Medical profile storage'
            ]
        }
    },
    'opcua-sim': {
        title: 'OPC UA Simulation Server and Client',
        description: 'A Python-based OPC UA server and client implementation that simulates industrial equipment data monitoring. The server generates random data for multiple equipment parameters, while the client can connect and monitor these values in real-time.',
        features: [
            'OPC UA Server simulating 5 pieces of equipment',
            'Real-time data generation for 7 different parameters',
            'Client application with GUI interface',
            'Configurable update interval',
            'Automatic reconnection handling',
            'Multi-parameter monitoring system',
            'Real-time data visualization'
        ],
        technical: [
            'Built with Python and OPC UA library',
            'PyQt5 for GUI implementation',
            'Real-time data generation and monitoring',
            'Client-server architecture',
            'Automated data simulation system',
            'Error handling and reconnection logic'
        ],
        challenges: [
            'Implementing reliable OPC UA communication',
            'Creating an efficient data generation system',
            'Building a responsive GUI for real-time monitoring',
            'Managing multiple equipment parameters simultaneously',
            'Ensuring stable server-client connections'
        ],
        specifications: {
            parameters: [
                'Temperature (20-30 units)',
                'Pressure (1000-1050 units)',
                'Torque (5-30 units)',
                'Humidity (40-60%)',
                'Light (500-1000 units)',
                'Voltage (110-240V)',
                'Watts (50-500W)'
            ],
            requirements: [
                'Python 3.x',
                'OPC UA library',
                'PyQt5 for GUI',
                'Network connectivity',
                'Compatible with Windows/Linux'
            ],
            configuration: [
                'Default endpoint: opc.tcp://0.0.0.0:4841/freeopcua/server/',
                'Namespace URI: http://examples.freeopcua.github.io',
                'Update interval: 1 second',
                'Configurable simulation parameters'
            ]
        }
    }
    // Add details for other projects...
};

// Modal handling
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.dataset.project;
        const details = projectDetails[projectId];
        showProjectDetails(details);
    });
});

function showProjectDetails(details) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="project-details">
                <h3>${details.title}</h3>
                <div class="project-details-section">
                    <p>${details.description}</p>
                </div>
                <div class="project-details-section">
                    <h4>Key Features</h4>
                    <ul>
                        ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-details-section">
                    <h4>Technical Implementation</h4>
                    <ul>
                        ${details.technical.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-details-section">
                    <h4>Challenges & Solutions</h4>
                    <ul>
                        ${details.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                ${details.specifications ? `
                <div class="project-details-section">
                    <h4>Specifications</h4>
                    ${details.specifications.parameters ? `
                        <h5>Monitored Parameters</h5>
                        <ul>
                            ${details.specifications.parameters.map(param => `<li>${param}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${details.specifications.requirements ? `
                        <h5>System Requirements</h5>
                        <ul>
                            ${details.specifications.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${details.specifications.configuration ? `
                        <h5>Server Configuration</h5>
                        <ul>
                            ${details.specifications.configuration.map(config => `<li>${config}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${details.specifications.audioCodecs ? `
                        <h5>Audio Codecs</h5>
                        <ul>
                            ${details.specifications.audioCodecs.map(codec => `<li>${codec}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${details.specifications.videoCodecs ? `
                        <h5>Video Codecs</h5>
                        <ul>
                            ${details.specifications.videoCodecs.map(codec => `<li>${codec}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${details.specifications.interface ? `
                        <h5>Interface Features</h5>
                        <ul>
                            ${details.specifications.interface.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.display = 'flex', 10);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        modal.remove();
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    };
} 

function showPrivateProjectMessage(project) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const content = project === 'opcua' ? {
        title: 'OPC UA Simulation System',
        message: 'This OPC UA Simulation System was developed as part of a company project and the source code is maintained under a confidential agreement.'
    } : {
        title: 'VoIP Softphone Application',
        message: 'This VoIP Softphone Application was developed as part of a company project and the source code is maintained under a confidential agreement.'
    };

    modal.innerHTML = `
        <div class="modal-content private-project-notice">
            <span class="close-modal">&times;</span>
            <div class="project-details">
                <h3>${content.title} - Private Repository</h3>
                <div class="project-details-section">
                    <p>${content.message}</p>
                    <p>While I cannot share the actual code, I'm happy to discuss:</p>
                    <ul>
                        <li>The technical architecture and design decisions</li>
                        <li>Challenges faced and solutions implemented</li>
                        <li>Technologies and frameworks used</li>
                        <li>My role and contributions to the project</li>
                    </ul>
                    <p>Feel free to reach out through the contact form to discuss more about this project!</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.display = 'flex', 10);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        modal.remove();
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    };
} 

// Dark mode toggle with proper initialization
const themeToggle = document.querySelector('.switch-name .checkbox');

// Function to set theme
function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    // Update checkbox state
    themeToggle.checked = theme === 'light';
    // Update particles
    updateParticleColors(theme);
}

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Toggle theme on click
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'light' : 'dark';
    setTheme(newTheme);
}); 

// Update particle colors based on theme
function updateParticleColors(theme) {
    const color = theme === 'dark' ? '#ffffff' : '#007bff';
    const opacity = theme === 'dark' ? 0.3 : 0.5;
    
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        particles.color.value = color;
        particles.line_linked.color = color;
        particles.line_linked.opacity = opacity;
        particles.move.speed = theme === 'dark' ? 1.5 : 2; // Slightly slower in dark mode
    }
} 