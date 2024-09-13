import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Welcome to your red canvas</h1>
      <p className="text-red-500 mb-8">Here&apos;s a chat interface that uses GPT-4 API</p>
      <ChatInterface />
    </div>
  );
}