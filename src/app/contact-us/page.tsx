export default function ContactUsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg leading-relaxed">
        Have questions or feedback? We&apos;d love to hear from you!
      </p>
      <ul className="text-lg leading-relaxed list-none space-y-2">
        <li>📧 Email: <a href="mailto:support@studiyo.app" className="text-blue-600 hover:underline">support@studiyo.app</a></li>
        <li>🌐 Website: <a href="https://studiyo-2.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://studiyo-2.vercel.app</a></li>
        <li>📍 Location: Vancouver Community College, Canada</li>
      </ul>
    </div>
  );
}
