
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Book, GraduationCap, Send } from "lucide-react";
import Button from "@/components/Button";
import { useSpecification } from "@/hooks/useSpecification";
import { useToast } from "@/hooks/use-toast";

// Common fields of study for suggestions
const suggestedFields = [
  "Computer Science",
  "Engineering",
  "Medicine",
  "Business",
  "Education",
  "Psychology",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Literature",
  "Arts",
  "History",
  "Political Science",
  "Economics",
  "Architecture",
  "Design",
  "Music",
  "Law",
  "Journalism"
];

const Specification = () => {
  const navigate = useNavigate();
  const { setSpecification } = useSpecification();
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    
    if (input.length > 0) {
      const filtered = suggestedFields.filter(field => 
        field.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setUserInput(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.trim() === "") {
      toast({
        title: "Specification Required",
        description: "Please enter your field of interest",
        variant: "destructive",
      });
      return;
    }
    
    setSpecification(userInput);
    toast({
      title: "Specification Saved",
      description: "Redirecting you to your AI mentor",
    });
    
    // Small delay for the toast to be visible
    setTimeout(() => {
      navigate("/mentor");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen pt-24 px-4 bg-gradient-to-br from-[#FFDEE2]/40 to-white"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-[#FFDEE2]/50 text-[#d67d8a] rounded-full mb-4">
            Step 1 of 2
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#d67d8a]">What would you like to learn?</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please tell us your educational interests or the field of study you're interested in.
            This helps our AI mentor provide tailored resources and guidance.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg rounded-xl p-8 mb-8 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-[#d67d8a]" />
              </div>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-4 py-3 border border-[#FFDEE2]/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d67d8a] focus:border-transparent transition-all"
                placeholder="Enter your field of interest (e.g., Computer Science, Medicine)"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-[#FFDEE2]/50 max-h-60 overflow-y-auto">
                  <ul className="py-1">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="px-4 py-2 hover:bg-[#FFDEE2]/30 cursor-pointer text-sm"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-[#d67d8a] hover:bg-[#c56a77]"
                icon={<Send className="ml-2 h-4 w-4" />}
              >
                Continue to AI Mentor
              </Button>
            </div>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg rounded-xl p-6 flex items-start space-x-4">
            <div className="bg-[#FFDEE2]/50 p-3 rounded-full">
              <Book className="h-6 w-6 text-[#d67d8a]" />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-[#d67d8a]">Personalized Learning Path</h3>
              <p className="text-sm text-muted-foreground">
                Based on your interests, our AI mentor will recommend courses, tutorials, and resources 
                specifically designed for female students in your field.
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-[#FFDEE2]/50 shadow-lg rounded-xl p-6 flex items-start space-x-4">
            <div className="bg-[#FFDEE2]/50 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-[#d67d8a]" />
            </div>
            <div>
              <h3 className="font-medium mb-2 text-[#d67d8a]">Scholarship Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                Discover scholarships, grants, and financial aid options available 
                for women in your chosen field of study.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Specification;
