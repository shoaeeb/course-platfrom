export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this course platform, you accept and agree to be bound by the terms and conditions of this agreement.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Course Access</h2>
          <p>Upon successful payment, you will receive lifetime access to the purchased course. Access is non-transferable and for personal use only.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
          <p>All payments are processed securely through Razorpay. Prices are listed in USD/INR and are subject to change without notice. Payment must be completed before accessing course content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
          <p>Due to the digital nature of our courses, all sales are final. Refunds are only provided in exceptional circumstances at our sole discretion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>All course content, including videos, text, and materials, are protected by copyright. You may not reproduce, distribute, or share course content without written permission.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. User Conduct</h2>
          <p>You agree not to misuse the platform, share login credentials, or attempt to download or redistribute course content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform or courses.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p>For questions about these terms, please contact us at support@courseplatform.com</p>
        </section>
      </div>
    </div>
  );
}
