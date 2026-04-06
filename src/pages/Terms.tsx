import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <ScrollText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using EduHorizon's services, you agree to be bound by these Terms and Conditions.</p>

            <h2>2. Services</h2>
            <p>Our services include:</p>
            <ul>
              <li>Educational consulting and guidance</li>
              <li>College admission assistance</li>
              <li>Career counseling</li>
              <li>Document preparation support</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use our services in compliance with applicable laws</li>
              <li>Not misuse or abuse our services</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <ul>
              <li>All fees are non-refundable unless stated otherwise</li>
              <li>Payment must be made as per the agreed schedule</li>
              <li>We reserve the right to modify our fees with notice</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>All content and materials provided by EduHorizon are protected by copyright and other intellectual property laws.</p>

            <h2>6. Limitation of Liability</h2>
            <p>EduHorizon shall not be liable for:</p>
            <ul>
              <li>Admission decisions by educational institutions</li>
              <li>Accuracy of third-party information</li>
              <li>Indirect or consequential damages</li>
            </ul>

            <h2>7. Termination</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Terminate services for violation of terms</li>
              <li>Modify or discontinue services</li>
              <li>Update these terms at any time</li>
            </ul>

            <h2>8. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Patna, Bihar.</p>

            <h2>9. Contact Information</h2>
            <p>For any queries regarding these terms, contact us at:</p>
            <ul>
              <li>Email: legal@eduhorizon.com</li>
              <li>Phone: +91 8877434088</li>
              <li>Address: Kankarbagh, Kumhrar, Patna, Bihar 800001</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}