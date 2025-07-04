export default function TestPage() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Norko Crystallize Test</h1>
            <p>If you can see this page, your Next.js setup is working!</p>
            <div style={{ background: '#f0f0f0', padding: '1rem', margin: '1rem auto', maxWidth: '500px' }}>
                <h2>Environment Check</h2>
                <p><strong>Tenant:</strong> {process.env.NEXT_PUBLIC_CRYSTALLIZE_TENANT_IDENTIFIER}</p>
                <p><strong>Railway API:</strong> {process.env.NEXT_PUBLIC_RAILWAY_API_URL}</p>
            </div>
        </div>
    );
}
