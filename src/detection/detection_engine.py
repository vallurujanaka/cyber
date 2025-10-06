"""
Main Detection Engine for the Cybersecurity Threat Detection System.
Orchestrates threat detection using multiple detection methods.
"""

from typing import Dict, List
from .signature_detector import SignatureDetector
from .anomaly_detector import AnomalyDetector
from .threat_classifier import ThreatClassifier
from ..utils.logger import get_logger

logger = get_logger()

class DetectionEngine:
    """Main detection engine that combines multiple detection methods."""
    
    def __init__(self):
        self.signature_detector = SignatureDetector()
        self.anomaly_detector = AnomalyDetector()
        self.threat_classifier = ThreatClassifier()
        logger.info("Detection Engine initialized.")
    
    def detect_threats(self, data: Dict) -> List[Dict]:
        """Detect threats in the given data."""
        threats = []
        
        # Signature-based detection
        signature_threats = self.signature_detector.detect(data)
        threats.extend(signature_threats)
        
        # Anomaly-based detection
        anomaly_threats = self.anomaly_detector.detect(data)
        threats.extend(anomaly_threats)
        
        # Classify threats
        classified_threats = self.threat_classifier.classify(threats)
        
        logger.info(f"Detected {len(classified_threats)} threats.")
        return classified_threats
    
    def update_signatures(self, signatures: List[Dict]):
        """Update the signature database."""
        self.signature_detector.update_signatures(signatures)
        logger.info("Signatures updated.")
    
    def train_models(self, training_data: List[Dict]):
        """Train the machine learning models."""
        self.anomaly_detector.train(training_data)
        self.threat_classifier.train(training_data)
        logger.info("Models trained.")

if __name__ == "__main__":
    engine = DetectionEngine()
    test_data = {"source_ip": "192.168.1.1", "destination_ip": "192.168.1.2"}
    threats = engine.detect_threats(test_data)
    print(threats)
