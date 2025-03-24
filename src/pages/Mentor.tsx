
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AIChat from "@/components/AIChat";
import { useSpecification } from "@/hooks/useSpecification";
import Button from "@/components/Button";
import { ArrowLeft } from "lucide-react";

const Mentor = () => {
  const navigate = useNavigate();
  const { specification } = useSpecification();

  // If no specification was provided, redirect to the specification page
  useEffect(() => {
    if (!specification) {
      navigate("/specification");
    }
  }, [specification, navigate]);

  // Initial welcome message for the AI
  const initialMessage = specification
    ? `Hello! I'm your AI educational mentor. I see you're interested in ${specification}. That's a great field of study! I'm here to provide resources and guidance tailored to your interest in ${specification}.

What specific aspects of ${specification} would you like to explore? For example, I can help with:
- Educational resources and courses
- Scholarship opportunities for women
- Mentorship programs
- Career pathways
- Research opportunities

Just let me know what you'd like to learn more about!`
    : "Hello! I'm your AI educational mentor. To provide you with tailored guidance, could you please share what field or subject you're interested in studying?";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen pt-24 px-4"
    >
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex items-center"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Your AI Educational Mentor</h1>
            {specification && (
              <p className="text-sm text-muted-foreground">
                Providing resources and guidance for <span className="font-medium text-primary">{specification}</span>
              </p>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 flex flex-col mb-8"
        >
          <AIChat initialMessage={initialMessage} specification={specification} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Mentor;
