export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight">CreatorAI</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Made by Musab
          <br />
          If anything is not working or gives error, contact: Ketnot786@gmail.com
        </p>
        <p className="text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} CreatorAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
