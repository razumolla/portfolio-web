export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {year} Razu Molla. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
