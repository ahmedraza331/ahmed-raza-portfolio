export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/[0.03] blur-[120px] animate-blob" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#3B82F6]/[0.03] blur-[120px] animate-blob animation-delay-2s" />
      <div className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full bg-[#8B5CF6]/[0.02] blur-[120px] animate-blob animation-delay-4s" />
    </div>
  );
}