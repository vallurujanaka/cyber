// CyberShield Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    startLiveUpdates();
    initializeCharts();
});

// Dashboard Initialization
function initializeDashboard() {
    console.log('CyberShield Dashboard Initialized');
    updateThreatsCount();
    populateThreatFeed();
}

function startLiveUpdates() {
    // Live updates disabled as per user request
    // No operation
}

// Threat Management
function updateThreatsCount() {
    const threatsCount = Math.floor(Math.random() * 100) + 50;
    document.getElementById('threats-count').textContent = threatsCount;
}

function populateThreatFeed() {
    const threatList = document.getElementById('threat-list');
    threatList.innerHTML = '';
    // No default threat data as per user request
}

function addNewThreat() {
    const threatTypes = [
        'Malware', 'Phishing', 'Brute Force', 'DDoS', 'SQL Injection',
        'XSS Attack', 'Ransomware', 'Data Exfiltration'
    ];
    
    const severities = ['critical', 'high', 'medium', 'low'];
    const times = ['just now', '1 minute ago', '2 minutes ago'];
    
    const newThreat = {
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        details: `New ${threatTypes[Math.floor(Math.random() * threatTypes.length)].toLowerCase()} detected`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        time: times[Math.floor(Math.random() * times.length)]
    };
    
    const threatList = document.getElementById('threat-list');
    if (threatList.children.length > 10) {
        threatList.removeChild(threatList.lastChild);
    }
    threatList.insertBefore(createThreatElement(newThreat), threatList.firstChild);
}

function createThreatElement(threat) {
    const div = document.createElement('div');
    div.className = 'threat-item';
    div.innerHTML = `
        <div class="threat-severity ${threat.severity}"></div>
        <div class="threat-content">
            <div class="threat-type">${threat.type}</div>
            <div class="threat-details">${threat.details}</div>
        </div>
        <div class="threat-time">${threat.time}</div>
    `;
    
    // Add click effect
    div.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    return div;
}

function refreshThreats() {
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    
    setTimeout(() => {
        populateThreatFeed();
        refreshBtn.innerHTML = '<i class="fas fa-sync"></i> Refresh';
        
        // Add refresh animation
        refreshBtn.classList.add('refreshing');
        setTimeout(() => {
            refreshBtn.classList.remove('refreshing');
        }, 1000);
    }, 1000);
}

// Chart Initialization
let threatTypeChart, riskLevelChart, trafficChart;

// Solution Steps Dictionary
const solutionSteps = {
    "malware": [
        "1. Isolate the infected system from the network immediately",
        "2. Run full system antivirus scan with updated definitions",
        "3. Remove or quarantine detected malicious files",
        "4. Update all software and operating system patches",
        "5. Change all passwords and monitor for suspicious activity",
        "6. Restore from clean backup if necessary"
    ],
    "phishing": [
        "1. Do not click on suspicious links or download attachments",
        "2. Verify sender email addresses carefully",
        "3. Enable multi-factor authentication (MFA)",
        "4. Educate users about phishing recognition",
        "5. Use email filtering and anti-phishing tools",
        "6. Report phishing attempts to IT security team"
    ],
    "brute_force": [
        "1. Implement account lockout policies after failed attempts",
        "2. Use strong, complex passwords",
        "3. Enable multi-factor authentication (MFA)",
        "4. Implement rate limiting on login attempts",
        "5. Use CAPTCHA for login forms",
        "6. Monitor authentication logs for suspicious patterns"
    ],
    "sql_injection": [
        "1. Use parameterized queries and prepared statements",
        "2. Implement input validation and sanitization",
        "3. Use stored procedures instead of dynamic SQL",
        "4. Apply least privilege principle to database accounts",
        "5. Use web application firewalls (WAF)",
        "6. Regularly update and patch database software"
    ],
    "xss": [
        "1. Implement proper input validation and output encoding",
        "2. Use Content Security Policy (CSP) headers",
        "3. Sanitize user input on both client and server side",
        "4. Use secure coding frameworks and libraries",
        "5. Implement XSS protection in web application firewalls",
        "6. Regularly scan for XSS vulnerabilities"
    ],
    "ddos": [
        "1. Implement rate limiting and traffic filtering",
        "2. Use DDoS protection services (Cloudflare, Akamai)",
        "3. Configure firewalls and intrusion prevention systems",
        "4. Implement network segmentation",
        "5. Use load balancers with DDoS mitigation",
        "6. Monitor network traffic patterns continuously"
    ],
    "ransomware": [
        "1. Isolate infected systems immediately",
        "2. Do not pay the ransom - it funds criminal activity",
        "3. Restore from clean, offline backups",
        "4. Update all systems and apply security patches",
        "5. Use endpoint detection and response (EDR) tools",
        "6. Implement regular backup and recovery testing"
    ],
    "man_in_the_middle": [
        "1. Use HTTPS/TLS encryption for all communications",
        "2. Implement certificate pinning",
        "3. Avoid public Wi-Fi for sensitive transactions",
        "4. Use VPN for remote access",
        "5. Verify SSL certificates before transmitting data",
        "6. Implement mutual authentication where possible"
    ],
    "zero_day": [
        "1. Keep all systems and software updated",
        "2. Use intrusion detection systems (IDS)",
        "3. Implement network segmentation",
        "4. Use behavior-based detection tools",
        "5. Monitor for anomalous system behavior",
        "6. Have incident response plan ready"
    ],
    "spyware": [
        "1. Run comprehensive anti-malware scans",
        "2. Remove suspicious browser extensions",
        "3. Clear browser cache and cookies",
        "4. Use privacy-focused browsers and extensions",
        "5. Enable firewall and real-time protection",
        "6. Monitor system performance and network activity"
    ],
    "trojan": [
        "1. Run full system antivirus scan",
        "2. Remove or quarantine detected files",
        "3. Change all passwords immediately",
        "4. Update operating system and applications",
        "5. Use sandboxing for suspicious files",
        "6. Monitor system for unauthorized access"
    ],
    "worm": [
        "1. Isolate infected systems from network",
        "2. Run antivirus scans on all connected systems",
        "3. Close vulnerable ports and services",
        "4. Apply security patches immediately",
        "5. Use network segmentation to contain spread",
        "6. Monitor network traffic for worm signatures"
    ],
    "rootkit": [
        "1. Boot from clean media for scanning",
        "2. Use specialized rootkit detection tools",
        "3. Reinstall operating system if necessary",
        "4. Update all system components",
        "5. Implement integrity monitoring",
        "6. Use secure boot and TPM if available"
    ],
    "keylogger": [
        "1. Run anti-malware scans with keylogger detection",
        "2. Change all passwords from clean system",
        "3. Use virtual keyboard for sensitive input",
        "4. Enable two-factor authentication",
        "5. Monitor system for unusual keyboard activity",
        "6. Use endpoint protection with behavior monitoring"
    ],
    "adware": [
        "1. Run anti-malware scans",
        "2. Remove suspicious browser extensions",
        "3. Reset browser settings to default",
        "4. Use ad-blocking extensions",
        "5. Avoid downloading from untrusted sources",
        "6. Keep browser and plugins updated"
    ],
    "anomaly": [
        "1. Investigate the source of anomalous behavior",
        "2. Review system and network logs",
        "3. Check for configuration changes",
        "4. Update monitoring and alerting rules",
        "5. Implement additional logging if needed",
        "6. Document findings for future reference"
    ]
};

function initializeCharts() {
    // Threat Type Distribution Chart
    const threatTypeCtx = document.getElementById('threatTypeChart').getContext('2d');
    threatTypeChart = new Chart(threatTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Malware', 'Phishing', 'Brute Force', 'DDoS', 'SQL Injection', 'XSS', 'Other'],
            datasets: [{
                data: [20, 15, 12, 10, 8, 6, 29],
                backgroundColor: [
                    '#ff4444',
                    '#ff6b35',
                    '#ffc107',
                    '#00d4ff',
                    '#ff1493',
                    '#32cd32',
                    '#888888'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    // Risk Level Chart
    const riskLevelCtx = document.getElementById('riskLevelChart').getContext('2d');
    riskLevelChart = new Chart(riskLevelCtx, {
        type: 'bar',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                label: 'Risk Level Distribution',
                data: [5, 15, 25, 55],
                backgroundColor: [
                    '#ff4444',
                    '#ff6b35',
                    '#ffc107',
                    '#00d4ff'
                ],
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Network Traffic Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    trafficChart = new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Incoming Traffic',
                data: [120, 150, 300, 450, 200, 180],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8
            }, {
                label: 'Outgoing Traffic',
                data: [80, 120, 250, 380, 150, 120],
                borderColor: '#ff6b35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ff6b35',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });
}

function updateCharts() {
    // Update threat type chart with random data (will be made dynamic based on detections)
    if (threatTypeChart) {
        threatTypeChart.data.datasets[0].data = [
            Math.floor(Math.random() * 50) + 20,
            Math.floor(Math.random() * 40) + 15,
            Math.floor(Math.random() * 30) + 10,
            Math.floor(Math.random() * 20) + 5,
            Math.floor(Math.random() * 15) + 5,
            Math.floor(Math.random() * 10) + 2,
            Math.floor(Math.random() * 25) + 10
        ];
        threatTypeChart.update();
    }

    // Update risk level chart with random data (will be made dynamic)
    if (riskLevelChart) {
        riskLevelChart.data.datasets[0].data = [
            Math.floor(Math.random() * 20) + 5,
            Math.floor(Math.random() * 30) + 10,
            Math.floor(Math.random() * 40) + 15,
            Math.floor(Math.random() * 50) + 20
        ];
        riskLevelChart.update();
    }

    // Update traffic chart with new data points
    if (trafficChart) {
        const newIncoming = Math.floor(Math.random() * 500) + 100;
        const newOutgoing = Math.floor(Math.random() * 400) + 80;

        // Shift data and add new point
        trafficChart.data.datasets[0].data.push(newIncoming);
        trafficChart.data.datasets[0].data.shift();

        trafficChart.data.datasets[1].data.push(newOutgoing);
        trafficChart.data.datasets[1].data.shift();

        trafficChart.update();
    }
}

// Function to update charts based on detected threat
function updateChartsWithThreat(threatType, riskScore) {
    if (!threatType || !riskScore) return;

    // Update threat type chart (Pie chart)
    if (threatTypeChart) {
        const threatLabels = threatTypeChart.data.labels;
        let threatIndex = threatLabels.findIndex(label =>
            label.toLowerCase().includes(threatType.toLowerCase().split(' ')[0])
        );

        // If threat type not found, add it to the chart
        if (threatIndex === -1) {
            threatLabels.push(threatType);
            threatTypeChart.data.datasets[0].data.push(1);
            threatTypeChart.data.datasets[0].backgroundColor.push(getRandomColor());
        } else {
            threatTypeChart.data.datasets[0].data[threatIndex] += 1;
        }
        threatTypeChart.update();
    }

    // Update risk level chart (Bar chart) based on risk score
    if (riskLevelChart) {
        let riskIndex;
        if (riskScore >= 80) riskIndex = 0; // Critical
        else if (riskScore >= 60) riskIndex = 1; // High
        else if (riskScore >= 40) riskIndex = 2; // Medium
        else riskIndex = 3; // Low

        riskLevelChart.data.datasets[0].data[riskIndex] += 1;
        riskLevelChart.update();
    }

    // Update network traffic chart (Line chart) based on risk score
    if (trafficChart) {
        // Calculate traffic spike based on risk score
        const baseTraffic = 100;
        const riskMultiplier = riskScore / 100; // 0-1 scale
        const trafficSpike = Math.floor(baseTraffic + (riskMultiplier * 300)); // 100-400 range

        // Add spike to incoming traffic (more affected by threats)
        const currentIncoming = trafficChart.data.datasets[0].data;
        currentIncoming.push(trafficSpike);
        if (currentIncoming.length > 6) currentIncoming.shift(); // Keep only 6 data points

        // Add smaller spike to outgoing traffic
        const currentOutgoing = trafficChart.data.datasets[1].data;
        const outgoingSpike = Math.floor(trafficSpike * 0.7); // 70% of incoming spike
        currentOutgoing.push(outgoingSpike);
        if (currentOutgoing.length > 6) currentOutgoing.shift();

        trafficChart.update();
    }
}

// Helper function to generate random colors for new threat types
function getRandomColor() {
    const colors = [
        '#ff4444', '#ff6b35', '#ffc107', '#00d4ff', '#ff1493',
        '#32cd32', '#888888', '#ff69b4', '#00ff7f', '#daa520'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// System Health Animation
function animateHealthBars() {
    const healthBars = document.querySelectorAll('.health-progress');
    healthBars.forEach(bar => {
        const randomWidth = Math.floor(Math.random() * 30) + 20;
        bar.style.width = randomWidth + '%';
        bar.previousElementSibling.textContent = randomWidth + '%';
    });
}

// Start health bar animations
setInterval(animateHealthBars, 3000);

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'r':
                e.preventDefault();
                refreshThreats();
                break;
            case '1':
                e.preventDefault();
                document.querySelector('[href="#dashboard"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[href="#threats"]').click();
                break;
        }
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Threat Detection Dataset
const threatDataset = {
    patterns: [
        {
            name: "SQL Injection",
            type: "Web Attack",
            patterns: ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "UNION", "OR 1=1", "';--", "1=1"],
            severity: "critical",
            confidence: 95,
            description: "Malicious SQL queries attempting to manipulate database"
        },
        {
            name: "XSS Attack",
            type: "Web Attack",
            patterns: ["<script>", "javascript:", "onerror=", "onload=", "alert(", "<iframe", "document.cookie"],
            severity: "high",
            confidence: 88,
            description: "Cross-site scripting attempt detected in input data"
        },
        {
            name: "Port Scan",
            type: "Reconnaissance",
            patterns: ["multiple ports", "connection attempts", "port 22", "port 3389", "nmap", "scan"],
            severity: "medium",
            confidence: 75,
            description: "Multiple port connection attempts indicating network reconnaissance"
        },
        {
            name: "DDoS Attempt",
            type: "Network Flood",
            patterns: ["high traffic", "multiple requests", "flood", "bandwidth", "syn flood", "udp flood"],
            severity: "critical",
            confidence: 92,
            description: "Distributed Denial of Service attack pattern detected"
        },
        {
            name: "Brute Force",
            type: "Authentication Attack",
            patterns: ["failed login", "multiple attempts", "password guess", "auth failure", "ssh brute", "ftp brute"],
            severity: "high",
            confidence: 85,
            description: "Multiple failed authentication attempts detected"
        },
        {
            name: "Malware",
            type: "Malware Infection",
            patterns: [".exe", ".dll", "trojan", "virus", "worm", "ransomware", "malware"],
            severity: "critical",
            confidence: 90,
            description: "Malicious software detected attempting to compromise the system"
        },
        {
            name: "Phishing",
            type: "Social Engineering",
            patterns: ["paypal", "bank", "login", "password", "click here", "urgent", "verify"],
            severity: "high",
            confidence: 80,
            description: "Phishing attempt detected in communication patterns"
        },
        {
            name: "Ransomware",
            type: "Data Encryption",
            patterns: ["encrypt", "bitcoin", "ransom", "decrypt", "locked", "pay now"],
            severity: "critical",
            confidence: 95,
            description: "Ransomware encryption patterns detected"
        },
        {
            name: "Man-in-the-Middle",
            type: "Network Interception",
            patterns: ["arp poison", "dns spoof", "ssl strip", "intercept", "mitm"],
            severity: "high",
            confidence: 85,
            description: "Man-in-the-middle attack patterns detected"
        },
        {
            name: "Zero Day",
            type: "Unknown Exploit",
            patterns: ["unknown", "exploit", "vulnerability", "zero day", "unpatched"],
            severity: "critical",
            confidence: 90,
            description: "Unknown exploit pattern detected - potential zero-day attack"
        },
        {
            name: "Spyware",
            type: "Surveillance",
            patterns: ["keylog", "screenshot", "monitor", "spy", "track", "adware"],
            severity: "medium",
            confidence: 75,
            description: "Spyware or tracking software detected"
        },
        {
            name: "Trojan",
            type: "Backdoor",
            patterns: ["backdoor", "trojan", "remote access", "c2", "command control"],
            severity: "high",
            confidence: 88,
            description: "Trojan horse or backdoor detected"
        },
        {
            name: "Worm",
            type: "Self-Replicating",
            patterns: ["worm", "spread", "infect", "network worm", "autorun"],
            severity: "high",
            confidence: 82,
            description: "Self-replicating worm detected spreading through network"
        },
        {
            name: "Rootkit",
            type: "System Compromise",
            patterns: ["rootkit", "kernel", "hide", "privilege", "system level"],
            severity: "critical",
            confidence: 90,
            description: "Rootkit detected attempting system-level compromise"
        },
        {
            name: "Keylogger",
            type: "Data Theft",
            patterns: ["keylog", "keystroke", "capture", "log keys", "input capture"],
            severity: "high",
            confidence: 85,
            description: "Keylogger detected capturing user input"
        },
        {
            name: "Adware",
            type: "Annoyance",
            patterns: ["ad", "popup", "advertisement", "unwanted", "spam"],
            severity: "low",
            confidence: 60,
            description: "Adware or unwanted advertisement software detected"
        }
    ],
    
    ipReputation: {
        "192.168.1.100": { reputation: "malicious", score: 95 },
        "10.0.0.50": { reputation: "suspicious", score: 70 },
        "172.16.0.1": { reputation: "clean", score: 10 }
    },
    
    portThreats: {
        "22": "SSH Brute Force",
        "23": "Telnet Attack",
        "80": "HTTP Attacks",
        "443": "HTTPS Attacks", 
        "3389": "RDP Attacks",
        "5900": "VNC Attacks"
    }
};

// Threat Detection Function
function analyzeThreat() {
    const sourceIp = document.getElementById('source-ip').value;
    const destIp = document.getElementById('destination-ip').value;
    const protocol = document.getElementById('protocol').value;
    const port = document.getElementById('port').value;
    const payloadSize = document.getElementById('payload-size').value;
    const requestType = document.getElementById('request-type').value;
    
    // Validate inputs
    if (!sourceIp || !destIp || !protocol) {
        alert('Please fill in all required fields (Source IP, Destination IP, Protocol)');
        return;
    }
    
    // Simulate analysis (in real system, this would call the backend API)
    const detectionResult = detectThreatPatterns({
        source_ip: sourceIp,
        destination_ip: destIp,
        protocol: protocol,
        port: parseInt(port),
        payload_size: parseInt(payloadSize),
        request_type: requestType
    });
    
    // Display results
    displayResults(detectionResult);
    
    // Add to threat feed
    addToThreatFeed(detectionResult);
}

function detectThreatPatterns(data) {
    let detectedThreats = [];
    let maxSeverity = "low";
    let maxConfidence = 0;

    // Check IP reputation
    if (threatDataset.ipReputation[data.source_ip]) {
        const ipInfo = threatDataset.ipReputation[data.source_ip];
        detectedThreats.push({
            name: "Malicious IP",
            type: "IP Reputation",
            severity: ipInfo.score > 80 ? "critical" : "high",
            confidence: ipInfo.score,
            description: `Source IP ${data.source_ip} has ${ipInfo.reputation} reputation`
        });
    }

    // Check port threats
    if (threatDataset.portThreats[data.port]) {
        detectedThreats.push({
            name: threatDataset.portThreats[data.port],
            type: "Port-based Threat",
            severity: "medium",
            confidence: 65,
            description: `Port ${data.port} is commonly targeted for attacks`
        });
    }

    // Check for large payloads (potential DDoS)
    if (data.payload_size > 10000) {
        detectedThreats.push({
            name: "Large Payload",
            type: "Network Anomaly",
            severity: "medium",
            confidence: 70,
            description: `Unusually large payload size: ${data.payload_size} bytes`
        });
    }

    // Check for pattern matches in input data
    const inputString = `${data.source_ip} ${data.destination_ip} ${data.protocol} ${data.port} ${data.payload_size} ${data.request_type}`.toLowerCase();
    threatDataset.patterns.forEach(pattern => {
        pattern.patterns.forEach(pat => {
            if (inputString.includes(pat.toLowerCase())) {
                detectedThreats.push({
                    name: pattern.name,
                    type: pattern.type,
                    severity: pattern.severity,
                    confidence: pattern.confidence,
                    description: pattern.description
                });
            }
        });
    });

    // Remove duplicates if any
    detectedThreats = detectedThreats.filter((threat, index, self) =>
        index === self.findIndex(t => t.name === threat.name)
    );

    // Find the highest severity threat
    if (detectedThreats.length > 0) {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        detectedThreats.forEach(threat => {
            if (severityOrder[threat.severity] > severityOrder[maxSeverity]) {
                maxSeverity = threat.severity;
                maxConfidence = threat.confidence;
            }
        });
    }

    return {
        threats: detectedThreats,
        primaryThreat: detectedThreats.length > 0 ? detectedThreats[0] : null,
        severity: maxSeverity,
        confidence: maxConfidence,
        timestamp: new Date().toISOString()
    };
}

function displayResults(result) {
    const resultsContainer = document.getElementById('results-container');
    const attackType = document.getElementById('attack-type');
    const attackName = document.getElementById('attack-name');
    const confidence = document.getElementById('confidence');
    const riskScore = document.getElementById('risk-score');
    const attackDetails = document.getElementById('attack-details');

    if (result.threats.length === 0) {
        if (attackType) attackType.textContent = "No threats detected";
        if (attackName) attackName.textContent = "Clean traffic";
        if (confidence) confidence.textContent = "100%";
        if (riskScore) riskScore.textContent = "0";
        if (attackDetails) attackDetails.textContent = "No malicious patterns detected in the input data.";
    } else {
        const primary = result.primaryThreat;
        if (attackType) {
            attackType.textContent = primary.type;
            attackType.setAttribute('data-severity', result.severity);
        }
        if (attackName) {
            attackName.textContent = primary.name;
            attackName.setAttribute('data-severity', result.severity);
        }
        if (confidence) {
            confidence.textContent = `${result.confidence}%`;
            confidence.setAttribute('data-severity', result.severity);
        }

        // Calculate risk score based on severity and confidence
        const riskScores = { critical: 90, high: 70, medium: 50, low: 30 };
        const riskScoreValue = Math.min(100, riskScores[result.severity] + (result.confidence / 100 * 10));
        if (riskScore) {
            riskScore.textContent = Math.round(riskScoreValue);
            riskScore.setAttribute('data-severity', result.severity);
        }

        // Build details text
        let detailsText = primary.description + "\n\n";
        if (result.threats.length > 1) {
            detailsText += `Additional threats detected (${result.threats.length - 1}):\n`;
            result.threats.slice(1).forEach((threat, index) => {
                detailsText += `${index + 1}. ${threat.name} (${threat.type})\n`;
            });
        }
        if (attackDetails) attackDetails.textContent = detailsText;

        // Update charts with detected threat
        updateChartsWithThreat(primary.name, riskScoreValue);

        // Show solution steps if available
        showSolutionSteps(primary.name.toLowerCase().replace(/\s+/g, '_'));
    }

    if (resultsContainer) resultsContainer.style.display = 'block';

    // Smooth scroll to results
    if (resultsContainer) resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to show solution steps for detected threat
function showSolutionSteps(threatKey) {
    const solutionContainer = document.getElementById('solution-container');
    const solutionStepsElement = document.getElementById('solution-steps');

    if (solutionSteps[threatKey]) {
        solutionStepsElement.innerHTML = solutionSteps[threatKey].map(step =>
            `<li>${step}</li>`
        ).join('');
        solutionContainer.style.display = 'block';
    } else {
        solutionContainer.style.display = 'none';
    }
}

// Function to download threat analysis report
function downloadReport() {
    const sourceIp = document.getElementById('source-ip').value;
    const destIp = document.getElementById('destination-ip').value;
    const protocol = document.getElementById('protocol').value;
    const port = document.getElementById('port').value;
    const payloadSize = document.getElementById('payload-size').value;
    const requestType = document.getElementById('request-type').value;

    const attackTypeElem = document.getElementById('attack-type');
    const attackNameElem = document.getElementById('attack-name');
    const confidenceElem = document.getElementById('confidence');
    const riskScoreElem = document.getElementById('risk-score');
    const attackDetailsElem = document.getElementById('attack-details');

    // Defensive check for null elements
    const attackType = attackTypeElem ? attackTypeElem.textContent : 'N/A';
    const attackName = attackNameElem ? attackNameElem.textContent : 'N/A';
    const confidence = confidenceElem ? confidenceElem.textContent : 'N/A';
    const riskScore = riskScoreElem ? riskScoreElem.textContent : 'N/A';
    const attackDetails = attackDetailsElem ? attackDetailsElem.textContent : 'N/A';

    const solutionStepsElem = document.getElementById('solution-steps');
    const recommendedActions = solutionStepsElem ? solutionStepsElem.innerText : 'No specific actions available';

    const reportContent = `
CyberShield Threat Analysis Report
==================================

Analysis Date: ${new Date().toLocaleString()}

Network Traffic Details:
-----------------------
Source IP: ${sourceIp}
Destination IP: ${destIp}
Protocol: ${protocol}
Port: ${port}
Payload Size: ${payloadSize} bytes
Request Type: ${requestType}

Threat Analysis Results:
-----------------------
Attack Type: ${attackType}
Attack Name: ${attackName}
Confidence Level: ${confidence}
Risk Score: ${riskScore}/100

Details:
${attackDetails}

Recommended Actions:
${recommendedActions}

---
Generated by CyberShield Threat Detection System
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `threat-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to download solution steps as text file
function downloadSolutionSteps() {
    const attackNameElem = document.getElementById('attack-name');
    const attackName = attackNameElem ? attackNameElem.textContent : 'Unknown Threat';

    const solutionStepsElem = document.getElementById('solution-steps');
    const solutionSteps = solutionStepsElem ? solutionStepsElem.innerText : 'No solution steps available';

    const content = `
CyberShield Solution Steps for ${attackName}
===========================================

${solutionSteps}

---
Generated by CyberShield Threat Detection System
Date: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution-steps-${attackName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function addToThreatFeed(result) {
    if (result.threats.length === 0) return;
    
    const threatList = document.getElementById('threat-list');
    const threatItem = document.createElement('div');
    threatItem.className = 'threat-item';
    
    threatItem.innerHTML = `
        <div class="threat-severity ${result.severity}"></div>
        <div class="threat-content">
            <div class="threat-type">${result.primaryThreat.name}</div>
            <div class="threat-details">${result.primaryThreat.description}</div>
        </div>
        <div class="threat-time">just now</div>
    `;
    
    threatList.insertBefore(threatItem, threatList.firstChild);
    
    // Update threats count
    const currentCount = parseInt(document.getElementById('threats-count').textContent);
    document.getElementById('threats-count').textContent = currentCount + 1;
}

// Performance Monitoring
let performanceMetrics = {
    loadTime: performance.now(),
    threatUpdates: 0,
    chartUpdates: 0,
    detections: 0
};

setInterval(() => {
    performanceMetrics.threatUpdates++;
    performanceMetrics.chartUpdates++;
    
    // Log performance every minute
    if (performanceMetrics.threatUpdates % 12 === 0) {
        console.log('Performance Metrics:', {
            uptime: Math.floor((performance.now() - performanceMetrics.loadTime) / 1000) + 's',
            threatUpdates: performanceMetrics.threatUpdates,
            chartUpdates: performanceMetrics.chartUpdates,
            detections: performanceMetrics.detections,
            memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'N/A'
        });
    }
}, 5000);
