export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Refund and Cancellation Policy</h1>
      
      <div className="prose max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. General Policy</h2>
          <p>Due to the nature of digital products and instant access to course content upon purchase, all sales are generally final and non-refundable.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
          <p>Refunds may be considered in the following exceptional circumstances:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Technical issues preventing access to purchased content that cannot be resolved</li>
            <li>Duplicate purchases made in error</li>
            <li>Unauthorized transactions (subject to verification)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Refund Request Process</h2>
          <p>To request a refund:</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>Contact us at refunds@courseplatform.com within 7 days of purchase</li>
            <li>Provide your order ID and reason for refund request</li>
            <li>Allow 5-7 business days for review</li>
            <li>If approved, refunds will be processed within 10-14 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Situations</h2>
          <p>Refunds will not be provided in the following cases:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Change of mind after accessing course content</li>
            <li>Failure to complete the course</li>
            <li>Dissatisfaction with course content after viewing</li>
            <li>Requests made after 7 days of purchase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Cancellation Policy</h2>
          <p>Once a course is purchased and accessed, it cannot be cancelled. You may stop using the platform at any time, but no refund will be provided for unused access.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Payment Disputes</h2>
          <p>For payment-related disputes, please contact us first before initiating a chargeback. Chargebacks may result in account suspension.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Refund Method</h2>
          <p>Approved refunds will be processed to the original payment method used for purchase through Razorpay.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>For refund inquiries, contact us at refunds@courseplatform.com</p>
        </section>
      </div>
    </div>
  );
}
