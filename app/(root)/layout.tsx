
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full font-inter">
        SIDEBAR
        <div className="flex size-full flex-col">
        {children}
          
            
        
        </div>
        
    </main>
  );
}
