import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.12),transparent_60%)]" />
        <div className="relative z-10">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/30 text-primary shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            <AlertCircle className="h-8 w-8" />
          </div>

          <h1 className="text-4xl font-bold mb-2">404</h1>

          <h2 className="text-xl font-semibold mb-4">
            الصفحة غير موجودة
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            الصفحة التي تحاول الوصول إليها غير متاحة أو تم نقلها.
            <br />
            يمكنك الرجوع إلى الصفحة الرئيسية.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none cta-glow cta-size"
            >
              <Home className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
