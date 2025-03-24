
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 pt-16 bg-gradient-to-br from-[#FFDEE2]/40 to-white"
    >
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[#FFDEE2]/50 text-[#d67d8a] rounded-full mb-4">
                  Empowering Female Education
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d67d8a] to-[#e9a0aa]">
                  Pathway to Equality
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-lg"
              >
                Discover educational resources tailored to your interests and goals. Our AI mentor will guide you through your educational journey and help you find the right path forward.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/specification")}
                icon={<ArrowRight className="ml-2 h-5 w-5 animate-pulse" />}
                className="bg-[#d67d8a] hover:bg-[#c56a77] group"
              >
                <span className="mr-2">Start Your Journey</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/contact")}
                className="border-[#d67d8a] text-[#d67d8a] hover:bg-[#FFDEE2]/20"
              >
                Contact Us
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { title: "Personalized Resources", description: "Get resources tailored to your specific area of interest." },
                { title: "AI Mentor Guidance", description: "Receive guidance from our intelligent AI mentor." },
                { title: "Women in Education", description: "Connect with programs supporting women's educational success." }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg rounded-xl p-4"
                >
                  <h3 className="font-medium text-sm mb-1 text-[#d67d8a]">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFDEE2]/60 to-[#ffb5c0]/40 rounded-full blur-3xl opacity-30 animate-pulse-subtle" />
            
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg rounded-2xl w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Education"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg p-4 rounded-xl">
              <div className="text-sm font-medium text-[#d67d8a]">
                Join thousands of students finding their path
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
