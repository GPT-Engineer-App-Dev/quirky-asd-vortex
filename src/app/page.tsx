import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false });

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <ChatInterface />
    </div>
  );
}