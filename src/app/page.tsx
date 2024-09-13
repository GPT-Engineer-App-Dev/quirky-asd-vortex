import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false });

export default function Home() {
  return (
    <div className="h-screen">
      <ChatInterface />
    </div>
  );
}