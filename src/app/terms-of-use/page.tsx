export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p>Welcome to Studiyo!</p>
      <p>By accessing or using our platform, you agree to the following terms:</p>
      <ol className="list-decimal list-inside space-y-2">
        <li><strong>Account Responsibility:</strong> Users are responsible for maintaining the confidentiality of their account credentials.</li>
        <li><strong>User Conduct:</strong> You agree to use the platform in a respectful and educational manner. Misuse or abusive behavior may result in account suspension.</li>
        <li><strong>Intellectual Property:</strong> All content, including games, quizzes, and designs, are owned by Studiyo and protected by applicable copyright laws.</li>
        <li><strong>Privacy & Security:</strong> We collect data to personalize your experience and keep your progress saved. See our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for more information.</li>
        <li><strong>Modifications:</strong> Studiyo reserves the right to update these terms at any time, with notice provided to users.</li>
      </ol>
      <p>Use of this platform signifies your agreement to these terms.</p>
    </div>
  );
}
