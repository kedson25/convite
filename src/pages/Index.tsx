import MobileWeddingInvite from "@/components/MobileWeddingInvite";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Admin Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="soft"
          size="sm"
          onClick={() => navigate('/admin')}
          className="gap-2 bg-white/90 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </div>
      
      <MobileWeddingInvite />
    </div>
  );
};

export default Index;