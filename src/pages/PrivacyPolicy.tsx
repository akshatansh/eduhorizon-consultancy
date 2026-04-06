import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Academic records and preferences</li>
              <li>Communication history with our team</li>
              <li>Information about your educational interests</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Providing educational consulting services</li>
              <li>Processing your applications and inquiries</li>
              <li>Communicating about our services</li>
              <li>Improving our services and user experience</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Educational institutions as part of the application process</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information, including:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>For privacy-related inquiries, contact us at:</p>
            <ul>
              <li>Email: privacy@eduhorizon.com</li>
              <li>Phone: +91 7004221975</li>
              <li>Address: Kankarbagh, Kumhrar, Patna, Bihar 800001</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}