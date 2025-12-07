export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Name and email address when you register</li>
            <li>Payment information processed through Razorpay</li>
            <li>Course enrollment and progress data</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Process your transactions</li>
            <li>Send you course updates and notifications</li>
            <li>Improve our platform and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Payment Information</h2>
          <p>Payment processing is handled by Razorpay. We do not store your complete credit card information. Razorpay's privacy policy governs the use of your payment information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to track activity on our platform and improve user experience. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p>We use third-party services including:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Razorpay for payment processing</li>
            <li>Google Analytics for usage analytics</li>
            <li>YouTube for video hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your account</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p>Our services are not intended for children under 13. We do not knowingly collect information from children under 13.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>If you have questions about this privacy policy, contact us at privacy@courseplatform.com</p>
        </section>
      </div>
    </div>
  );
}
